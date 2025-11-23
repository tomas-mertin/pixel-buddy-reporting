-- Add INSERT policies so the API can write data
-- Using service role key, so we need policies that allow inserts

CREATE POLICY "Service role can insert applications" 
  ON public.applications FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service role can insert test_runs" 
  ON public.test_runs FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service role can insert baselines" 
  ON public.baselines FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service role can insert screenshots" 
  ON public.screenshots FOR INSERT 
  WITH CHECK (true);

-- Also add UPDATE policies for applications
CREATE POLICY "Service role can update applications" 
  ON public.applications FOR UPDATE 
  USING (true);

-- Also add SELECT for service role (in addition to public SELECT)
CREATE POLICY "Service role can select applications" 
  ON public.applications FOR SELECT 
  USING (true);

CREATE POLICY "Service role can select test_runs" 
  ON public.test_runs FOR SELECT 
  USING (true);

CREATE POLICY "Service role can select baselines" 
  ON public.baselines FOR SELECT 
  USING (true);

CREATE POLICY "Service role can select screenshots" 
  ON public.screenshots FOR SELECT 
  USING (true);