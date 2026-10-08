CREATE TABLE public.guesty_search_cache (
  key text PRIMARY KEY,
  listings jsonb NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.guesty_search_cache TO service_role;
ALTER TABLE public.guesty_search_cache ENABLE ROW LEVEL SECURITY;