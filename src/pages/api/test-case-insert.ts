import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create Supabase client with anon key (same as frontend)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log("Testing case insert with anon key...");

    // Test data
    const testCase = {
      full_name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      country: "United States",
      scam_type: "cryptocurrency",
      amount_lost: 1000,
      incident_description: "This is a test case to diagnose the RLS policy issue. This description is longer than 50 characters to meet validation requirements.",
      status: "submitted"
    };

    console.log("Attempting to insert:", testCase);

    // Try to insert
    const { data, error } = await supabase
      .from("case_reviews")
      .insert([testCase])
      .select()
      .single();

    if (error) {
      console.error("Insert failed:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        raw: error
      });
    }

    console.log("Insert successful:", data);

    return res.status(200).json({
      success: true,
      message: "Test case inserted successfully",
      caseId: data.id,
      data: data
    });

  } catch (error: any) {
    console.error("Test failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}