"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSentModal } from "./message-sent-modal";

interface SendMessageFormProps {
  ticketId: number;
  creator_email: string;
}

const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export function SendMessageForm({
  ticketId,
  creator_email,
}: SendMessageFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
  });

  function onSubmit(data: MessageFormValues) {
    console.log("here we would send an email to: ", creator_email);
    console.log("with a subject of: ", `Update on ticket #${ticketId}`);
    console.log("with the message: ", data.message);
    setIsOpen(true);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-1/3 md:items-center"
      >
        <label className="font-[500]" htmlFor={`message-form-${ticketId}`}>
          Send a Message:
        </label>
        <textarea
          id={`message-form-${ticketId}`}
          placeholder="Your message is logged to the browser console for now..."
          className="border w-full min-h-64 flex flex-grow rounded px-2 py-1 mt-2"
          {...register("message")}
        />
        {errors.message && <span>{errors.message.message}</span>}
        <button
        id={`send-message-button-${ticketId}`}
          type="submit"
          className="w-fit border rounded px-2 py-1 bg-white hover:bg-secondary hover:text-white transform transition-all mt-3"
        >
          Send Message
        </button>
      </form>
      <MessageSentModal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        ticketNumber={ticketId}
        reset={reset}
      />
    </>
  );
}
