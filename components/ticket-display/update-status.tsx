"use client";
import React from "react";
import { updateTicketStatus } from "@/actions";

interface UpdateStatusFormProps {
  ticketId: number;
  status: "new" | "in_progress" | "resolved";
  setStatus: (status: "new" | "in_progress" | "resolved") => void;
}

export function UpdateStatus({
  ticketId,
  status,
  setStatus,
}: UpdateStatusFormProps) {
  async function onChangeHandler(status: "new" | "in_progress" | "resolved") {
    const res = await updateTicketStatus(ticketId, status);
    if (res.success) {
      setStatus(status);
    }
  }

  return (
    <div className="flex flex-col md:w-1/3 md:items-center">
      <label className="font-[500]" htmlFor={`status-select-${ticketId}`}>Update Status:</label>
      <select
        id={`status-select-${ticketId}`}
        className="w-fit border rounded py-1 mt-2"
        defaultValue={status}
        onChange={(e) => {
          onChangeHandler(e.target.value as "new" | "in_progress" | "resolved");
        }}
      >
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}
