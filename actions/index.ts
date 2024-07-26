"use server";
import { TicketData } from "@/components/forms/new-ticket-form";
import { LoginData } from "@/components/forms/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//AUTH FUNCTIONS
export async function signIn(loginData: LoginData) {
  const { email, password } = loginData;
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return "bad credentials";
  }

  return redirect("/admin");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/admin/login");
}

export async function checkUserAuthentication() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("admin/login");
  }
  return user;
}
//TICKET FUNCTIONS
export async function submitTicketForm(ticketData: TicketData) {
  const supabase = createClient();
  const dataToInsert = {
    creator_name: ticketData.fullName,
    creator_email: ticketData.email,
    description: ticketData.description,
  };

  const { data, error } = await supabase
    .from("tickets")
    .insert([dataToInsert])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function updateTicketStatus(
  ticketId: number,
  status: "new" | "in_progress" | "resolved"
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .update({ status })
    .match({ id: ticketId });

  if (error) {
    console.error("Error updating ticket status:", error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

//REVALIDATION FUNCTIONS
export async function revalidate(path: string) {
  revalidatePath(path, "page");
  return
}
