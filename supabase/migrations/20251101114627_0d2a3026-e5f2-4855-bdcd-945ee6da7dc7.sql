-- Create businesses table
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  niche TEXT NOT NULL,
  google_review_url TEXT NOT NULL,
  emoji_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create review_templates table
CREATE TABLE public.review_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  niche TEXT NOT NULL,
  mood_level INTEGER NOT NULL CHECK (mood_level >= 1 AND mood_level <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_templates ENABLE ROW LEVEL SECURITY;

-- Businesses are viewable by everyone (for public NFC landing pages)
CREATE POLICY "Businesses are publicly readable"
  ON public.businesses
  FOR SELECT
  USING (true);

-- Only authenticated users (admins) can insert/update/delete businesses
CREATE POLICY "Authenticated users can insert businesses"
  ON public.businesses
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update businesses"
  ON public.businesses
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete businesses"
  ON public.businesses
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Review templates are viewable by everyone
CREATE POLICY "Review templates are publicly readable"
  ON public.review_templates
  FOR SELECT
  USING (true);

-- Only authenticated users can manage review templates
CREATE POLICY "Authenticated users can insert review templates"
  ON public.review_templates
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update review templates"
  ON public.review_templates
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete review templates"
  ON public.review_templates
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster slug lookups
CREATE INDEX idx_businesses_slug ON public.businesses(slug);

-- Create index for review template lookups
CREATE INDEX idx_review_templates_niche_mood ON public.review_templates(niche, mood_level);