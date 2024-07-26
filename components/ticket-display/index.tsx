"use client";
import { Database } from "@/types/supabase";
import { TicketItem } from "./ticket-item";
import { AnimatePresence } from "framer-motion";
interface TicketDisplayProps {
  tickets: Database["public"]["Tables"]["tickets"]["Row"][];
}
export default function TicketDisplay({ tickets }: TicketDisplayProps) {
  return (
    <div id="ticket-display" className="border shadow-md rounded-md h-full w-full">
      <div className="flex py-2 px-4 font-[800]">
        <p className="flex justify-start w-1/3  ">Requester</p>
        <p className="flex justify-center w-1/3">Status</p>
        <div className="flex justify-end w-1/3">
          <p className="mr-[25px]">Request Date</p>
        </div>
      </div>
      <AnimatePresence>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </AnimatePresence>
    </div>
  );
}
