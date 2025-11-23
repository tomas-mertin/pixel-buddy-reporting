import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Screenshot {
  screenName: string;
  actualImage: string; // base64
  baselineImage?: string; // base64
  diffImage?: string; // base64
  differencePercentage?: number;
  status: 'passed' | 'failed' | 'pending';
}

interface TestResult {
  applicationName: string;
  applicationDescription?: string;
  screenshots: Screenshot[];
  metadata?: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const testResult: TestResult = await req.json();
    console.log('Processing test result for:', testResult.applicationName);

    // Helper function to upload base64 image
    const uploadImage = async (base64Data: string, path: string): Promise<string> => {
      // Remove data:image/png;base64, prefix if present
      const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
      
      // Convert base64 to Uint8Array
      const binaryString = atob(base64Clean);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const { data, error } = await supabase.storage
        .from('screenshots')
        .upload(path, bytes, {
          contentType: 'image/png',
          upsert: true,
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('screenshots')
        .getPublicUrl(path);

      return publicUrl;
    };

    // 1. Get or create application
    let { data: application, error: appError } = await supabase
      .from('applications')
      .select('id')
      .eq('name', testResult.applicationName)
      .maybeSingle();

    if (appError && appError.code !== 'PGRST116') {
      throw appError;
    }

    if (!application) {
      const { data: newApp, error: createError } = await supabase
        .from('applications')
        .insert({
          name: testResult.applicationName,
          description: testResult.applicationDescription || null,
        })
        .select()
        .single();

      if (createError) throw createError;
      application = newApp;
    }

    if (!application) {
      throw new Error('Failed to create or retrieve application');
    }

    // 2. Create test run
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const failedCount = testResult.screenshots.filter(s => s.status === 'failed').length;
    const status = failedCount > 0 ? 'failed' : 'passed';

    const { data: testRun, error: runError } = await supabase
      .from('test_runs')
      .insert({
        application_id: application.id,
        status: status,
        total_screenshots: testResult.screenshots.length,
        failed_screenshots: failedCount,
        completed_at: new Date().toISOString(),
        metadata: testResult.metadata || {},
      })
      .select()
      .single();

    if (runError) throw runError;

    // 3. Process screenshots
    for (let i = 0; i < testResult.screenshots.length; i++) {
      const screenshot = testResult.screenshots[i];
      const screenSafeName = screenshot.screenName.replace(/[^a-zA-Z0-9]/g, '_');
      
      console.log(`Processing screenshot ${i + 1}/${testResult.screenshots.length}: ${screenshot.screenName}`);

      // Upload actual image
      const actualPath = `${application.id}/${testRun.id}/${screenSafeName}_actual_${timestamp}.png`;
      const actualUrl = await uploadImage(screenshot.actualImage, actualPath);

      // Upload baseline if provided
      let baselineId = null;
      if (screenshot.baselineImage) {
        const baselinePath = `${application.id}/baselines/${screenSafeName}_baseline.png`;
        const baselineUrl = await uploadImage(screenshot.baselineImage, baselinePath);

        // Check if baseline exists
        const { data: existingBaseline } = await supabase
          .from('baselines')
          .select('id')
          .eq('application_id', application.id)
          .eq('screen_name', screenshot.screenName)
          .eq('is_active', true)
          .maybeSingle();

        if (existingBaseline) {
          // Update existing baseline
          const { error: updateError } = await supabase
            .from('baselines')
            .update({ image_url: baselineUrl })
            .eq('id', existingBaseline.id);

          if (updateError) throw updateError;
          baselineId = existingBaseline.id;
        } else {
          // Create new baseline
          const { data: newBaseline, error: baselineError } = await supabase
            .from('baselines')
            .insert({
              application_id: application.id,
              screen_name: screenshot.screenName,
              image_url: baselineUrl,
              is_active: true,
            })
            .select()
            .single();

          if (baselineError) throw baselineError;
          baselineId = newBaseline.id;
        }
      }

      // Upload diff if provided
      let diffUrl = null;
      if (screenshot.diffImage) {
        const diffPath = `${application.id}/${testRun.id}/${screenSafeName}_diff_${timestamp}.png`;
        diffUrl = await uploadImage(screenshot.diffImage, diffPath);
      }

      // Insert screenshot record
      const { error: screenshotError } = await supabase
        .from('screenshots')
        .insert({
          test_run_id: testRun.id,
          screen_name: screenshot.screenName,
          baseline_id: baselineId,
          actual_image_url: actualUrl,
          diff_image_url: diffUrl,
          difference_percentage: screenshot.differencePercentage || null,
          status: screenshot.status,
        });

      if (screenshotError) throw screenshotError;
    }

    console.log('Test results processed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        testRunId: testRun.id,
        applicationId: application.id,
        message: `Processed ${testResult.screenshots.length} screenshots`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error processing test results:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
