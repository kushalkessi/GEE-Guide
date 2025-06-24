// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dibqwvlhdkpursrormwx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpYnF3dmxoZGtwdXJzcm9ybXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NDAxNzIsImV4cCI6MjA2NTMxNjE3Mn0.RdG6tdBLMDDb_kZxw8BsYumDgq35ohah6pY1KGp9X4s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);