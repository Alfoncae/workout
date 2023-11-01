"use client";

import { useSession } from "next-auth/react";
import getWorkout from "@/prisma/calls/getWorkout";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteWorkout from "@/prisma/calls/deleteWorkout";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    params: { id: string };
};

export default function WorkoutLog({ params }: Props) {
    const { data: session } = useSession();

    const [content, setContent] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const fetchData = async () => {
        if (session) {
            const { result, error } = await getWorkout(params.id);

            setContent(result);

            if (error) {
                console.log(error);
            }
        }
        setLoading(false);
    };

    const notify = () => {
        toast.success("Workout deleted.", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    const handleDelete = async () => {
        const { error } = await deleteWorkout(params.id);

        if (error) {
            console.log(error);
        }

        router.push("/home");

        notify();
    };

    const editWorkout = async () => {
        router.push(`/home/${params.id}/edit`);
    };

    useEffect(() => {
        fetchData();
    }, [session]);

    const valuesArray = [
        { label: "description", content: content?.description },
        { label: "category", content: content?.category },
        { label: "difficulty", content: content?.difficulty },
    ];

    return (
        <main className="break-words flex flex-col gap-6 py-20 justify-center">
            <div className="border p-4 text-center w-[300px] text-xl h-[100px]">
                {loading && (
                    <div className="flex flex-col gap-2 items-center">
                        <Skeleton className="h-[28px] w-[110px]" />
                        <Skeleton className="h-[28px] w-[140px]" />
                    </div>
                )}
                <h1>{content?.title}</h1>
                {content?.assignedAt.toLocaleDateString()}
            </div>
            <div className="flex gap-3">
                <div className="border w-1/2 p-4">
                    Reps: {content?.reps ?? 0}
                </div>
                <div className="border w-1/2 p-4">
                    Sets: {content?.sets ?? 0}
                </div>
            </div>
            <div className="border p-4">
                Duration: {content?.duration ?? 0} - Minutes
            </div>
            <div className="border p-4 w-[300px] h-[380px]">
                <div className="space-y-4">
                    {valuesArray.map((item) => {
                        return (
                            <div key={item.label} className="h-[50px]">
                                <Label
                                    htmlFor={item.label}
                                    className="text-slate-400 underline underline-offset-4"
                                >
                                    {item.label[0].toUpperCase() +
                                        item.label.slice(1)}
                                </Label>
                                <h2 className="text-left" id={item.label}>
                                    {item.content}
                                    {loading && (
                                        <Skeleton className="h-[20px] w-[200px] mt-1" />
                                    )}
                                </h2>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4">
                    <Label
                        className="text-slate-400 underline underline-offset-4"
                        htmlFor="list"
                    >
                        Exercises
                    </Label>
                    <ul id="list" className="px-4 py-1">
                        {content?.exercises?.map((exercise) => {
                            return (
                                <li className="list-disc" key={exercise.id}>
                                    {exercise.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Button onClick={() => editWorkout()}>Edit</Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="scale-75 sm:scale-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will delete the workout
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete()}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}
