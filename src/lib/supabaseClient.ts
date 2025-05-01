import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oeebbhgexwkfzpmetlrs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZWJiaGdleHdrZnpwbWV0bHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDM1MjgsImV4cCI6MjA1OTA3OTUyOH0.nH1zFHpovbkxM5A6eVVY398_RNdDf75jtK0A-XUQO5I";

export default class SupabasePool {
  private static instance: SupabaseClient;

  static getInstance(): SupabaseClient {
    if (SupabasePool.instance) {
      return this.instance;
    } else {
      this.instance = createClient(supabaseUrl, supabaseKey);
      return this.instance;
    }
  }
}
