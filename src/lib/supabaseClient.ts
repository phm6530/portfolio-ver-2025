import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default class SupabasePool {
  private static instance: SupabaseClient;

  static getInstance(): SupabaseClient {
    if (SupabasePool.instance) {
      return this.instance;
    } else {
      this.instance = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );
      return this.instance;
    }
  }
}
