"use client";

import Image from "next/image";
import GoogleIcon from "@/public/google-logo.png";
import { useState } from "react";
import { signIn } from "next-auth/react";
import clsx from "clsx";

const SignIn = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await signIn("google", {
            callbackUrl: "/home",
        });
        setLoading(false);
    };

    return (
        <main className="flex flex-col items-center h-screen justify-center p-6 gap-3">
            <h1 className="text-4xl text-center">Get Started!</h1>
            <div
                onClick={handleSubmit}
                className="flex items-center outline-none gap-5 my-3 border border-white hover:opacity-75 rounded-md p-3 transition-all cursor-pointer"
            >
                <Image
                    src={GoogleIcon}
                    alt="google-icon"
                    width={40}
                    height={40}
                    className={clsx(loading && "animate-spin")}
                />
                <p className="text-white text-xl ">Sign in with Google</p>
            </div>
        </main>
    );
};

export default SignIn;
