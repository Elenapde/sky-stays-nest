CREATE TABLE public.guesty_token_requests (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  env text NOT NULL,
  requested_at timestamptz NOT NULL DEFAULT now(),
  status int
);
CREATE INDEX guesty_token_requests_env_time ON public.guesty_token_requests (env, requested_at DESC);
GRANT ALL ON public.guesty_token_requests TO service_role;
ALTER TABLE public.guesty_token_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.guesty_listings_cache (
  env text PRIMARY KEY,
  listings jsonb NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.guesty_listings_cache TO service_role;
ALTER TABLE public.guesty_listings_cache ENABLE ROW LEVEL SECURITY;