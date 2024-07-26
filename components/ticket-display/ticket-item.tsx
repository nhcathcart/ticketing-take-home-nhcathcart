"use client";
import { Database } from "@/types/supabase";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import { UpdateStatus } from "./update-status";
import { SendMessageForm } from "./send-message-form";

interface TicketItemProps {
  ticket: Database["public"]["Tables"]["tickets"]["Row"];
}

//These maps are used to display the status of the ticket
const dotMap = {
  new: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="red"
      className="bi bi-circle-fill"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
  ),
  in_progress: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="orange"
      className="bi bi-circle-fill"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
  ),
  resolved: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="green"
      className="bi bi-circle-fill"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
  ),
};
const textMap = {
  new: "New",
  in_progress: "Prog",
  resolved: "Res",
};

export function TicketItem({ ticket }: TicketItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"new" | "in_progress" | "resolved">(
    ticket.status!
  );
  return (
    <motion.div
      id={`ticket-item-parent-${ticket.id}`}
      className=" h-fit w-full border-b flex flex-col overflow-hidden py-5 px-4 "
    >
      {/* This portion is visible at all times */}
      <div
        id={`ticket-item-visible-${ticket.id}`}
        className="w-full flex cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          id={`ticket-item-creator-${ticket.id}`}
          className="flex justify-start w-1/3"
        >
          {ticket.creator_name}
        </p>
        <div className="flex justify-center items-center w-1/3">
          <div className="w-[3.5rem] flex justify-start items-center gap-2">
            <span>{dotMap[status]}</span>
            <p id={`ticket-item-status-${ticket.id}`}>{`${textMap[status]}`}</p>
          </div>
        </div>
        <div className="flex justify-end w-1/3 items-center gap-2">
          <p id={`ticket-item-date-${ticket.id}`}>
            {new Date(ticket.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
      {/* This portion is visible when the local state is open */}
      <motion.div
        className="h-fit w-full overflow-hidden"
        initial={isOpen ? "open" : "collapsed"}
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 1, height: "0" },
        }}
      >
        {" "}
        <div
          className=" mt-4 py-4 px-2 md:px-4 flex flex-col md:flex-row bg-primary rounded text-sm"
          style={{ boxShadow: "inset 0 0 6px rgb(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col md:flex-row w-full gap-5 md:gap-0">
            <div className="flex flex-col-reverse md:flex-col justify-between md:w-1/3">
              <div className="mt-2 md:mt-0">
                <p className="font-[500]">Problem Description:</p>
                <p id={`ticket-item-description-${ticket.id}`} className="mt-2">
                  {ticket.description}
                </p>
              </div>
              <p className="font-[600] md:mt-2">Ticket # {`${ticket.id}`}</p>
            </div>
            <UpdateStatus
              ticketId={ticket.id}
              status={status}
              setStatus={setStatus}
            />
            <SendMessageForm
              ticketId={ticket.id}
              creator_email={ticket.creator_email}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
