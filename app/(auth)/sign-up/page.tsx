import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SignUpForm } from "./form";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
    const session = await getServerSession(authOptions);

    if (session !== null) {
        redirect("/home");
    } else {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:border space-y-12">
                    <h1 className="font-semibold text-2xl">
                        Create an Account
                    </h1>
                    <SignUpForm />
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            className="text-slate-500 hover:underline"
                            href="/sign-in"
                        >
                            Sign in
                        </Link>{" "}
                    </p>
                </div>
            </div>
        );
    }
}
