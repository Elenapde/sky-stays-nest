CREATE VIEW public.experience_offer_visibility AS SELECT o.id, o.active FROM public.experience_offers o JOIN public.experience_content e ON e.slug = o.experience_slug WHERE e.active;
GRANT SELECT ON public.experience_offer_visibility TO anon, authenticated;
COMMENT ON VIEW public.experience_offer_visibility IS 'Public visibility flags only; never exposes unvalidated offer content or prices.';