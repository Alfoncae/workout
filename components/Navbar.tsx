"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="flex justify-between w-3/4 items-center">
            <Link
                className="underline underline-offset-4 hover:text-slate-400"
                href="/home/create"
            >
                New Workout +
            </Link>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Menu />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={() => router.push("/home")}>
                            Home
                        </MenubarItem>
                        <MenubarItem onClick={() => signOut()}>
                            Sign Out
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </nav>
    );
}
