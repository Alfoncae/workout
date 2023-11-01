"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { TWorkoutSchema, workoutSchema } from "@/lib/types";
import { getServerSession } from "next-auth";

export default async function updateWorkout(
    workout: TWorkoutSchema,
    workoutId: string
) {
    const session = await getServerSession(authOptions);

    let error = null;
    let result;

    const isWorking = workoutSchema.parse(workout);

    if (workout.reps < 0) {
        workout.reps = 0;
    }
    if (workout.sets < 0) {
        workout.sets = 0;
    }
    if (workout.duration < 0) {
        workout.duration = 0;
    }

    if (isWorking) {
        try {
            result = await prisma.workout.update({
                where: {
                    id: workoutId,
                    userId: session.user.id,
                },
                data: {
                    title: workout.title,
                    sets: workout.sets,
                    description: workout.description,
                    category: workout.category,
                    difficulty: workout.difficulty,
                    duration: workout.duration,
                    reps: workout.reps,
                    assignedAt: workout.date,
                    userId: session.user.id,
                },
            });
            await prisma.exercise.deleteMany({
                where: {
                    workoutId,
                },
            });
            await prisma.exercise.createMany({
                data: workout.exercises.map((exerciseName) => ({
                    name: exerciseName,
                    workoutId,
                })),
            });
        } catch (err) {
            error = err;
        }
    }

    return { result, error };
}
