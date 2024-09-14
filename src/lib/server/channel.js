import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://gqctecjxrunxoqmggwmb.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxY3RlY2p4cnVueG9xbWdnd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDY0NTIsImV4cCI6MjAxODQ4MjQ1Mn0.c83qAV-K3sPKbzOEYCE5i0XT69CsQC3VolMid1TwCRs"

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY;

//@ts-ignore

export const supabase = createClient(supabaseUrl, supabaseKey);
export const channel = supabase.channel('room-one') // set your topic here