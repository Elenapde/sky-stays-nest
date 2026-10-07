ALTER TABLE public.guesty_token ADD COLUMN blocked_until timestamptz;
ALTER TABLE public.guesty_token ALTER COLUMN token DROP NOT NULL;
ALTER TABLE public.guesty_token ALTER COLUMN expires_at DROP NOT NULL;