import { queryOptions } from '@tanstack/react-query';
import { getRiverExperience } from './river.functions';
export const riverQuery = queryOptions({ queryKey: ['river-experience'], queryFn: () => getRiverExperience(), staleTime: 30_000 });