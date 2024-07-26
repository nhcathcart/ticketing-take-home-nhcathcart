"use client";

import { signOut } from "@/actions";

export function LogoutButton() {
  async function handleClick(){
    await signOut();
  }
  return (
    <button
      className="bg-primary w-fit px-6 py-3 rounded-md hover:bg-secondary hover:text-white transform transition-all shadow"
      onClick={() => handleClick()}
    >
      Log Out
    </button>
  );
}
