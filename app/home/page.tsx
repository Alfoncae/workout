"use client";

import WorkoutCard from "@/components/WorkoutCard";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getData from "@/prisma/calls/getData";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const [workouts, setWorkouts] = useState([]);
    const [search, setSearch] = useState("");
    const [noWorkouts, setNoWorkouts] = useState<boolean>(null);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    const fetchData = async () => {
        if (session) {
            const { result, error } = await getData();

            if (result.length > 0) {
                setNoWorkouts(false);
                setLoading(false);
            } else {
                setNoWorkouts(true);
            }
            const searchedWorkouts = result?.filter((workout) => {
                return (
                    (search && workout.title.toLowerCase().includes(search)) ||
                    workout?.category?.toLowerCase().includes(search)
                );
            });
            setWorkouts(searchedWorkouts);

            if (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [session, search]);

    return (
        <div className="p-6 flex flex-col break-words space-y-3.5 w-full max-w-3xl">
            <SearchBar search={search} setSearch={setSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6 w-full">
                {loading && (
                    <>
                        <Skeleton className="h-[250px] w-[325px] rounded-sm" />
                        <Skeleton className="h-[250px] w-[325px] rounded-sm" />
                        <Skeleton className="h-[250px] w-[325px] rounded-sm" />
                        <Skeleton className="h-[250px] w-[325px] rounded-sm" />
                    </>
                )}
                {workouts?.map((workout) => {
                    const exercises = workout.exercises.map((exercise) => {
                        return exercise;
                    });
                    return (
                        <WorkoutCard
                            title={workout.title}
                            id={workout.id}
                            key={workout.id}
                            difficulty={workout.difficulty}
                            category={workout.category}
                            exercises={exercises}
                            assignedAt={workout.assignedAt}
                            duration={workout.duration}
                        />
                    );
                })}
            </div>
            {noWorkouts === false && workouts.length === 0 && (
                <div className="flex flex-col justify-center text-center">
                    No Workouts match with the given search...
                </div>
            )}
            {noWorkouts && (
                <div className="text-center">You have no workouts</div>
            )}
        </div>
    );
}
