import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestResult {
  applicationName: string;
  applicationDescription?: string;
  screenshots: {
    screenName: string;
    actualImageUrl: string;
    baselineImageUrl?: string;
    diffImageUrl?: string;
    differencePercentage?: number;
    status: 'passed' | 'failed' | 'pending';
  }[];
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const testResult: TestResult = await req.json();
    console.log('Received test result:', testResult);

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

    // 3. Process screenshots and baselines
    for (const screenshot of testResult.screenshots) {
      let baselineId = null;

      // Handle baseline if provided
      if (screenshot.baselineImageUrl) {
        // Check if baseline exists
        const { data: existingBaseline } = await supabase
          .from('baselines')
          .select('id')
          .eq('application_id', application.id)
          .eq('screen_name', screenshot.screenName)
          .eq('is_active', true)
          .maybeSingle();

        if (existingBaseline) {
          baselineId = existingBaseline.id;
        } else {
          // Create new baseline
          const { data: newBaseline, error: baselineError } = await supabase
            .from('baselines')
            .insert({
              application_id: application.id,
              screen_name: screenshot.screenName,
              image_url: screenshot.baselineImageUrl,
              is_active: true,
            })
            .select()
            .single();

          if (baselineError) throw baselineError;
          baselineId = newBaseline.id;
        }
      }

      // Insert screenshot
      const { error: screenshotError } = await supabase
        .from('screenshots')
        .insert({
          test_run_id: testRun.id,
          screen_name: screenshot.screenName,
          baseline_id: baselineId,
          actual_image_url: screenshot.actualImageUrl,
          diff_image_url: screenshot.diffImageUrl || null,
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
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error processing test results:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
