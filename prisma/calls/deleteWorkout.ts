"use server";

import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export default async function deleteWorkout(id: string) {
    const session = await getUserSession();

    let error = null;
    let result;

    try {
        result = await prisma.workout.delete({
            where: {
                userId: session?.id,
                id,
            },
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
