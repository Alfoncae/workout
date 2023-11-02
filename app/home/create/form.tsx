"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TWorkoutSchema, workoutSchema } from "@/lib/types";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import createWorkout from "@/prisma/calls/createWorkout";

function WorkoutForm() {
    const [inputValue, setInputValue] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [duration, setDuration] = useState("");
    const [badges, setBadges] = useState([]);

    const router = useRouter();
    const notify = () => {
        toast.success("Workout logged!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    // Destructure functions from react-hook-form
    const form = useForm<TWorkoutSchema>({
        resolver: zodResolver(workoutSchema),
        defaultValues: {
            title: "",
            description: "",
            reps: 0,
            sets: 0,
            duration: 0,
            date: new Date(),
            exercises: [],
        },
    });

    const onSubmit = async (data: TWorkoutSchema) => {
        if (badges) {
            data.exercises = [...badges];
        }

        if (reps) {
            data.reps = parseInt(reps);
        }
        if (sets) {
            data.sets = parseInt(sets);
        }
        if (duration) {
            data.duration = parseInt(duration);
        }

        const result = await createWorkout(data);
        if (result.error === null) {
            notify();
            router.push("/home");
        }
    };

    const deleteBadge = (index: number) => {
        setBadges((badges) => badges.filter((_, i) => i !== index));
    };

    const addExercise = () => {
        if ({ ...form.register("exercises") }) {
            if (badges.length < 4) {
                setBadges([...badges, inputValue]);
                setInputValue("");
            }
            setInputValue(""); // Clear the input field
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Describe your activity... (optional)"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal w-full",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="center"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Enter up to 4 workouts (optional)"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button type="button" onClick={addExercise}>
                        Add Workout
                    </Button>

                    <div className="flex flex-col gap-2">
                        {badges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex justify-between border rounded-lg bg-slate-900 p-2 w-full"
                            >
                                {badge}
                                <X
                                    onClick={() => deleteBadge(index)}
                                    width={20}
                                    className="hover:cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="CARDIO">
                                            CARDIO
                                        </SelectItem>
                                        <SelectItem value="STRENGTH">
                                            STRENGTH
                                        </SelectItem>
                                        <SelectItem value="SPORTS">
                                            SPORTS
                                        </SelectItem>
                                        <SelectItem value="FUNCTIONAL">
                                            FUNCTIONAL
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="DIFFICULTY" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="EASY">
                                            EASY
                                        </SelectItem>
                                        <SelectItem value="MODERATE">
                                            MODERATE
                                        </SelectItem>
                                        <SelectItem value="HARD">
                                            HARD
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        type="number"
                        placeholder="Reps (optional)"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Sets (optional)"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                    />
                </div>
                <Input
                    type="number"
                    placeholder="Duration in minutes (optional)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />

                <Button
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export { WorkoutForm };
