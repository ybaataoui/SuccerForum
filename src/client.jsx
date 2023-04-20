import { createClient } from "@supabase/supabase-js";

const URL = 'https://tlqvpiglvddbjiwoqooq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXZwaWdsdmRkYmppd29xb29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3MTUyNjAsImV4cCI6MTk5NjI5MTI2MH0.X4Xgm-pKI9MprdHbdgDqFD9ss-rQoiA0Bjx_hRKvh6U';

export const supabase = createClient(URL, API_KEY);


