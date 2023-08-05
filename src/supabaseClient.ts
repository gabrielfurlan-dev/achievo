import { createClient } from '@supabase/supabase-js';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
