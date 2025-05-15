"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useMemo } from "react";
import { getAvatarUrl } from "@/utils/getAvatarUrl";

export function Profile() {
  const { data: session, status } = useSession();

  const avatarUrl = useMemo(() => {
    return getAvatarUrl(session?.user?.name || "S N");
  }, [session]);

  if (status === "loading") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={avatarUrl} alt={session?.user?.name || "N H"} />
            <AvatarFallback className="rounded-lg">SN</AvatarFallback>
          </Avatar>
          <div className="flex items-center text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {session?.user?.name}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={avatarUrl} alt={session?.user?.name || "N H"} />
              <AvatarFallback className="rounded-lg">SN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session?.user?.name}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
