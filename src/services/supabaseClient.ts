
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nbvixaquuqilbakwnoxe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // chave anon

export const supabase = createClient(supabaseUrl, supabaseKey);
