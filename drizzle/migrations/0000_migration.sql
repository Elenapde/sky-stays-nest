CREATE TABLE public.guesty_token (
  id int PRIMARY KEY DEFAULT 1,
  token text NOT NULL,
  expires_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.guesty_token TO service_role;
ALTER TABLE public.guesty_token ENABLE ROW LEVEL SECURITY;