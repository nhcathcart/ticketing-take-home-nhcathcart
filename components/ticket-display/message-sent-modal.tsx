import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface MessageSentModalProps {
  isOpen: boolean;
  close: () => void;
  ticketNumber: number | null;
  reset: () => void;
}

export function MessageSentModal({
  isOpen,
  close,
  ticketNumber,
  reset,
}: MessageSentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
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
            className="relative rouded-full min-w-[50vh] bg-white text-black flex justify-between px-4 pt-8 pb-6 gap-12 items-center rounded-lg flex-col shadow"
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
                {`Your message has been sent regarding ticket #${ticketNumber}`}
              </p>
            </div>
            <button
              onClick={() => {
                close();
                reset();
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
