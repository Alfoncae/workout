import Link from "next/link";
import { SignInForm } from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await getServerSession(authOptions);

    if (session !== null) {
        redirect("/home");
    } else
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:border rounded space-y-12">
                    <h1 className="font-semibold text-2xl">Log In</h1>
                    <SignInForm />
                    <p className="text-center">
                        Need to create an account?{" "}
                        <Link
                            className="text-slate-500 hover:underline"
                            href="/sign-up"
                        >
                            Sign up
                        </Link>{" "}
                    </p>
                </div>
            </div>
        );
}
