import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies();
  const supabaseUrl = process.env.APP_ENV === 'test'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!
    : process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const supabaseAnonKey = process.env.APP_ENV === 'test'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error("Error setting cookies", error);
          }
        },
      },
    },
  );
};
