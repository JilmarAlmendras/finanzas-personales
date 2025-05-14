"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-primary font-semibold" : "text-muted-foreground";

  return (
    <nav className="w-full border-b px-4 py-3 flex justify-between items-center bg-white">
      <Link href="/" className="text-xl font-bold text-primary">
        finanzas-personales
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/" className={isActive("/")}>
          Dashboard
        </Link>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
