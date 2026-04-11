import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase credentials for API route");
}

// Initialize Supabase admin client (uses service role key - bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { auth_id, email, name } = req.body;

    // Validate required fields
    if (!auth_id || !email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create user profile using service role (bypasses RLS)
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          auth_id,
          email,
          name,
          avatar_url: "",
          github_username: "",
          github_id: 0,
          plan: "free",
          subscription_status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}
