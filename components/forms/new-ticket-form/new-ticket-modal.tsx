import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";
interface TicketModalProps {
  isOpen: boolean;
  close: () => void;
  ticketNumber: number | null;
}

export function NewTicketModal({
  isOpen,
  close,
  ticketNumber,
}: TicketModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={"new-ticket-modal"}
          className="absolute w-full h-full flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute w-full h-full bg-black bg-opacity-80"
            onClick={() => close()}
          />
          <motion.div
            initial={{ scale: 0.75 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative rouded-full min-w-[300px] bg-white text-black flex justify-between px-4 pt-8 pb-6 gap-12 items-center rounded-lg flex-col shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary rounded-full p-4">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-secondary"
                />
              </div>
              <h3 className="text-3xl font-[800]">Success!</h3>
              <p className="mt-2 text-xs">
                Someone from our team will reach out shortly.
              </p>
              <p className="text-xs mt-6">
                Save your ticket number for reference:
              </p>
              <p className="text-lg mt-4">{ticketNumber ?? ""}</p>
            </div>
            <button
              id="close-modal-button"
              onClick={() => {
                close();
              }}
              className="bg-primary w-fit px-6 py-3 rounded-md hover:bg-secondary hover:text-white transform transition-all shadow"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
