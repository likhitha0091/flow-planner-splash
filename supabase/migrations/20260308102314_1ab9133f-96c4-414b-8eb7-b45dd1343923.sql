ALTER TABLE public.study_sessions 
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS target_duration_minutes integer NOT NULL DEFAULT 25;