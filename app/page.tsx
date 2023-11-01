import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session !== null) {
        redirect("/home");
    } else
        return (
            <main className="flex items-center w-screen h-screen text-center justify-center text-4xl">
                <div className="flex flex-col items-center gap-10 animate-landing-text p-4">
                    <h2>
                        Welcome, Here you will be{" "}
                        <span className="text-slate-500">taking</span> and{" "}
                        <span className="text-slate-500">tracking</span> your
                        workouts.
                    </h2>
                    <Link href={"/sign-in"}>
                        <Button className="w-[200px] gap-6 hover:bg-slate-950 hover:text-slate-50 border">
                            <div>Lets get Started!</div>
                            <MoveRight />
                        </Button>
                    </Link>
                </div>
            </main>
        );
}
