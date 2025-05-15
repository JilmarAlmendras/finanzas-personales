"use client";

import Image from "next/image";
import { Profile } from "./profile";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-4 py-3 flex justify-between items-center bg-white">
      <div className="flex items-center gap-2">
        <Image src="/money-bag.png" alt="logo" width={32} height={32} />
        <p className="text-2xl font-bold text-primary">FINANZAS PERSONALES</p>
      </div>

      <Profile />
    </nav>
  );
}
