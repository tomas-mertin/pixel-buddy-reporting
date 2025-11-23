-- Create applications table
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create test_runs table
CREATE TABLE public.test_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL CHECK (status IN ('passed', 'failed', 'running')),
  total_screenshots integer DEFAULT 0,
  failed_screenshots integer DEFAULT 0,
  started_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create baselines table
CREATE TABLE public.baselines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  screen_name text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true,
  UNIQUE(application_id, screen_name, is_active)
);

-- Create screenshots table
CREATE TABLE public.screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_run_id uuid REFERENCES public.test_runs(id) ON DELETE CASCADE NOT NULL,
  screen_name text NOT NULL,
  baseline_id uuid REFERENCES public.baselines(id),
  actual_image_url text NOT NULL,
  diff_image_url text,
  difference_percentage numeric(5,2),
  status text NOT NULL CHECK (status IN ('passed', 'failed', 'pending')),
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baselines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenshots ENABLE ROW LEVEL SECURITY;

-- Create public read policies (anyone can read test results)
CREATE POLICY "Anyone can view applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Anyone can view test runs" ON public.test_runs FOR SELECT USING (true);
CREATE POLICY "Anyone can view baselines" ON public.baselines FOR SELECT USING (true);
CREATE POLICY "Anyone can view screenshots" ON public.screenshots FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_test_runs_application ON public.test_runs(application_id);
CREATE INDEX idx_test_runs_status ON public.test_runs(status);
CREATE INDEX idx_screenshots_test_run ON public.screenshots(test_run_id);
CREATE INDEX idx_baselines_application ON public.baselines(application_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for applications
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();