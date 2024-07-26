import { NewTicketForm } from "@/components/forms/new-ticket-form";

export default async function Homepage() {
  return (
    <div className="relative flex items-center justify-center min-h-full w-full overflow-x-hidden overflow-y-scroll px-4 py-2 md:px-12 md:py-12">
      <NewTicketForm />
    </div>
  );
}
