"use client";
import { useState } from "react";
import { NavItem } from ".";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface MobileMenuProps {
  navArray: NavItem[];
}

export default function MobileMenu({ navArray }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="open menu"
        id="open-nav-button"
      >
        <Bars3Icon className="h-8 w-8" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-full bg-primary flex flex-col items-center"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "linear" }}
          >
            <div className="flex w-full justify-end p-4">
              <button onClick={() => setIsOpen(false)} id="close-nav-button">
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="flex flex-col gap-4 text-2xl font-[600] items-center">
              {navArray.map((item) => {
                return (
                  <Link
                    id={`mobile-${item.id}`}
                    key={`mobile-${item.text}`}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {item.text}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
