"use client";

import { useSession } from "next-auth/react";
import { EditWorkoutForm } from "./form";
import getWorkout from "@/prisma/calls/getWorkout";
import { useEffect, useState } from "react";

type Props = {
    params: { id: string };
};

export default function Create({ params }: Props) {
    const { data: session } = useSession();
    const [content, setContent] = useState(undefined);

    return (
        <main className="w-[70%] py-24 p-6 sm:w-[600px] text-center space-y-10">
            <h1 className="text-3xl">Edit!</h1>
            <EditWorkoutForm workoutId={params.id} />
        </main>
    );
}
