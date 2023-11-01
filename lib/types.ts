import { z } from "zod";

export const workoutSchema = z.object({
    title: z.string().min(2, "Title is too short"),
    description: z.string().optional(),
    category: z.enum(["CARDIO", "STRENGTH", "FUNCTIONAL", "SPORTS"]),
    difficulty: z.enum(["EASY", "MODERATE", "HARD"]),
    exercises: z.array(z.string()).max(4).optional(),
    date: z.date({ required_error: "Add a date" }),
    reps: z.number().optional(),
    sets: z.number().optional(),
    duration: z.number().optional(),
});

export type TWorkoutSchema = z.infer<typeof workoutSchema>;
