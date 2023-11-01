"use client";

import { WorkoutForm } from "./form";

export default function Create() {
    return (
        <main className="w-[70%] py-24 p-6 sm:w-[600px] text-center space-y-10">
            <h1 className="text-3xl">Create Workout!</h1>
            <WorkoutForm />
        </main>
    );
}
