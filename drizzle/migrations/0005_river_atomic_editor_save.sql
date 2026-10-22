CREATE FUNCTION public.save_river_content(payload jsonb) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE offer jsonb;
BEGIN
 IF NOT public.is_experience_editor() THEN RAISE EXCEPTION 'Forbidden'; END IF;
 IF jsonb_array_length(payload->'offers') <> 2 OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(payload->'offers') o WHERE o->>'id' = 'business-sunset') OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(payload->'offers') o WHERE o->>'id' = 'private-moments') THEN RAISE EXCEPTION 'Invalid offers'; END IF;
 UPDATE public.experience_content SET content = payload->'content', active = (payload->>'active')::boolean, updated_at = now() WHERE slug = 'sky-stays-on-the-river';
 IF NOT FOUND THEN RAISE EXCEPTION 'Missing experience'; END IF;
 FOR offer IN SELECT * FROM jsonb_array_elements(payload->'offers') LOOP
  UPDATE public.experience_offers SET content = offer->'content', active = (offer->>'active')::boolean, validated = (offer->>'validated')::boolean, updated_at = now() WHERE id = offer->>'id' AND experience_slug = 'sky-stays-on-the-river';
  IF NOT FOUND THEN RAISE EXCEPTION 'Missing offer'; END IF;
 END LOOP;
END; $$;
REVOKE ALL ON FUNCTION public.save_river_content(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_river_content(jsonb) TO authenticated;