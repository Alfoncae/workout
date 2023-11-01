"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function deleteWorkout(id: string) {
    const session = await getServerSession(authOptions);

    let error = null;
    let result;

    try {
        result = await prisma.workout.delete({
            where: {
                userId: session?.user?.id,
                id,
            },
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
