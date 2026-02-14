import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zfihhldodctflfkeshpg.supabase.co";
const supabaseAnonKey = "sb_publishable_6w3FZaMF2Zxh5D2Z2GuxJQ_WUhG2XfE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
