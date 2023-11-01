"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export const SignInForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const callbackUrl = searchParams.get("callbackUrl") || "/home";
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl,
            });
            console.log("Res", res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("Invalid email or password");
            }
        } catch (err: any) {}
        setLoading(false);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    className="w-full"
                    name="email"
                    id="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    className="w-full"
                    name="password"
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <Alert variant={"destructive"}>{error}</Alert>}
            <div className="w-full">
                <Button className="w-full rounded" size="lg">
                    {loading ? (
                        <TailSpin
                            height="26"
                            width="26"
                            color="black"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    ) : (
                        "Login"
                    )}
                </Button>
            </div>
        </form>
    );
};
