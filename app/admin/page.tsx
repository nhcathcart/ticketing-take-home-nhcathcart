import { checkUserAuthentication } from "@/actions";
import { LogoutButton } from "@/components/logout-button";
import TicketDisplay from "@/components/ticket-display";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const user = await checkUserAuthentication();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select()
    .order("created_at", { ascending: false });
  return (
    <div className="relative flex flex-col items-center h-full w-full overflow-x-hidden overflow-y-scroll px-4 py-4 md:px-12 md:py-8">
      <div className="flex justify-between items-center mb-4 w-full px-4">
        <p>
          <span className="font-[500]">Logged in as : </span> {user.email}
        </p>
        <LogoutButton />
      </div>
      {data ? <TicketDisplay tickets={data} /> : null}
    </div>
  );
}
