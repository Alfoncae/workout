"use server";

import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export default async function getData() {
    const session = await getUserSession();

    let error = null;
    let result;

    try {
        result = await prisma.workout.findMany({
            where: {
                userId: session?.id,
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
