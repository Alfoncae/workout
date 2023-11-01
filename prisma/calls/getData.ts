"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function getData() {
    const session = await getServerSession(authOptions);

    let error = null;
    let result;

    try {
        result = await prisma.workout.findMany({
            where: {
                userId: session?.user?.id,
            },
            include: {
                exercises: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
