import { createClient } from '@supabase/supabase-js';
import variables from 'variables';

const supabaseUrl = variables.SUPABASE_URL;
const supabaseKey = variables.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
