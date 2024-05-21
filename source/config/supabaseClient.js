/**
 * This is the file that connects to the Supabase database.
 */
const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
module.exports = prisma;
