import type { Metadata } from "next";
import { GeistMono } from "geist/font";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import NextAuthProvider from "@/components/NextAuthProvider";

export const metadata: Metadata = {
    title: "Workout Tracker",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(GeistMono.className, "dark:bg-slate-950")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    storageKey="cross-theme"
                >
                    <NextAuthProvider>{children}</NextAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
