"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { revalidate, submitTicketForm } from "@/actions";
import { NewTicketModal } from "./new-ticket-modal";

//constants
const schema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "A valid email address is required" }),
  description: z.string().min(10, { message: "Description is required" }),
});

export type TicketData = z.infer<typeof schema>;

const inputStyles = "border rounded px-2 py-1";
const inputParentStyles = "flex flex-col gap-1";
const inputLabelStyles = "text-xs font-[400] ml-1";
const inputErrorStyles = " text-xs text-red-500 ml-1";

export function NewTicketForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TicketData) => {
    const res = await submitTicketForm(data);
    if (res.success) {
      setIsOpen(true);
      if (res.data) setTicketNumber(res.data[0].id);
      revalidate("/admin");
    } else {
      // consider adding a modal here for failures
      alert(
        "Something went wrong submitting your ticket. Please try again later."
      );
    }
  };

  function onClose() {
    setIsOpen(false);
    reset();
  }

  return (
    <>
      <form
        id="new-ticket-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:px-12 md:py-6 border shadow rounded-md w-full px-2 py-6 md:max-w-[500px] gap-6 "
      >
        <h3 className="w-full text-center font-[500] text-xl mb-4">
          New Ticket
        </h3>
        <div className={inputParentStyles}>
          <label className={inputLabelStyles} htmlFor="fullName">
            Full Name:
          </label>
          <input
            id="fullName"
            {...register("fullName")}
            className={inputStyles}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <span id="full-name-error" className={inputErrorStyles}>{errors.fullName.message}</span>
          )}
        </div>
        <div className={inputParentStyles}>
          <label className={inputLabelStyles} htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputStyles}
            placeholder="johndoe@domain.com"
          />
          {errors.email && (
            <span id="email-error" className={inputErrorStyles}>{errors.email.message}</span>
          )}
        </div>
        <div className={inputParentStyles}>
          <label className={inputLabelStyles} htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...register("description")}
            className={`${inputStyles} h-32 md:h-64`}
            placeholder="Describe your issue here..."
          />
          {errors.description && (
            <span id="description-error" className={inputErrorStyles}>
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="w-full flex justify-center mt-6">
          <button
            id="submit-ticket-button"
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-fit px-6 py-3 rounded-md hover:bg-secondary hover:text-white transform transition-all shadow"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <NewTicketModal
        isOpen={isOpen}
        close={() => onClose()}
        ticketNumber={ticketNumber}
      />
    </>
  );
}
