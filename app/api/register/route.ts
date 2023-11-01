import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log(user);
        return NextResponse.json({
            user: {
                email: user.email,
            },
        });
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
                error: err.message,
            }),
            {
                status: 500,
            }
        );
    }
}
