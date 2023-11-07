import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/session";
import landingScreenshot from "@/public/landing-screenshot.png";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
    const session = await getUserSession();

    if (session !== undefined) {
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
                        <Button className="w-[200px] gap-6 p-6 hover:bg-slate-950 hover:text-slate-50 border">
                            <div>Lets get Started!</div>
                            <MoveRight />
                        </Button>
                    </Link>
                    <div className="mt-6 sm:h-[400px] sm:w-[640px] h-[200px] w-[320px]  border border-stone-100 relative">
                        <Image
                            className="object-cover"
                            fill
                            src={landingScreenshot}
                            alt="Example Screenshot"
                        />
                    </div>
                </div>
            </main>
        );
}
