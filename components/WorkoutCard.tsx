"use client";
import { Dumbbell, Activity, PersonStanding, Medal } from "lucide-react";
import { useRouter } from "next/navigation";

type MyObjectType = {
    id: string;
    name: string;
    workoutId: string | null;
};

type Props = {
    id: string;
    title: string;
    category: string;
    assignedAt: Date;
    difficulty: string | null;
    duration: number | null;
    exercises: MyObjectType[];
};

type DifficultyColorMapping = {
    [key: string]: string;
};

export default function WorkoutCard({
    id,
    title,
    category,
    assignedAt,
    difficulty,
    exercises,
    duration,
}: Props) {
    const date = assignedAt.toDateString();

    const difficultyColorMapping: DifficultyColorMapping = {
        EASY: "text-green-500",
        MODERATE: "text-yellow-500",
        HARD: "text-red-500",
    };

    const difficultyColorClass =
        difficultyColorMapping[difficulty ?? ""] || "bg-gray-200 text-gray-600";

    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/home/${id}`)}
            key={id}
            className="border p-4 rounded-md shadow-md hover:cursor-pointer h-[250px] w-[325px] mx-auto"
        >
            <div className="text-center">
                <h2 className="text-xl font-semibold flex items-center justify-center gap-4">
                    {title}
                    {category === "STRENGTH" ? (
                        <Dumbbell className={difficultyColorClass} />
                    ) : category === "CARDIO" ? (
                        <Activity className={difficultyColorClass} />
                    ) : category === "SPORTS" ? (
                        <Medal className={difficultyColorClass} />
                    ) : category === "FUNCTIONAL" ? (
                        <PersonStanding className={difficultyColorClass} />
                    ) : (
                        // Default case, you can render something else or just null
                        ""
                    )}
                </h2>
                <div className="text-gray-600">
                    {category} - {date}
                </div>
            </div>
            <div className="mt-4">
                <div className="mb-2">
                    <strong>Duration:</strong> {duration || 0} minutes
                </div>
                <div className="mb-2">
                    <strong>Key Exercises:</strong>
                    <ul className="list-disc pl-6">
                        {exercises.length > 0 ? (
                            exercises.map((exercise) => {
                                return (
                                    <li key={exercise.id}>{exercise.name}</li>
                                );
                            })
                        ) : (
                            <div className="list-">
                                <li>[______]</li>
                                <li>[______]</li>
                                <li>[______]</li>
                                <li>[______]</li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
