"use server";

import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export default async function getWorkout(id: string) {
    const session = await getUserSession();

    let error = null;
    let result;

    try {
        result = await prisma.workout.findUnique({
            where: {
                userId: session?.id,
                id,
            },
            include: {
                exercises: true,
            },
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
