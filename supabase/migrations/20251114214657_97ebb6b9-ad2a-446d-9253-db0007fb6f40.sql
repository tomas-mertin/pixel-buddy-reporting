-- Create storage bucket for screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots', 'screenshots', true);

-- RLS policies for screenshots bucket
CREATE POLICY "Anyone can view screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'screenshots');

CREATE POLICY "Service role can upload screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'screenshots');

CREATE POLICY "Service role can update screenshots"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'screenshots');

CREATE POLICY "Service role can delete screenshots"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'screenshots');