const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://zfihhldodctflfkeshpg.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

module.exports = { supabaseAdmin };