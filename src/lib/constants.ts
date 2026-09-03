export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const POSTGREST_URL = `${SUPABASE_URL}/rest/v1`;