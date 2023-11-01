"use client";

import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
    search: string;
    setSearch: Function;
};

export default function SearchBar({ search, setSearch }: Props) {
    return (
        <div className="flex justify-center w-auto sm:px-3">
            <div className="relative mt-10 w-full">
                <div className="absolute inset-y-0 flex items-center pl-3">
                    <Search height={18} />
                </div>
                <Input
                    type="search"
                    placeholder="Search Workouts..."
                    className="w-full py-3 pl-12 pr-2 outline-none rounded-md"
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value.toLowerCase())
                    }
                />
            </div>
        </div>
    );
}
{
    /* <Input placeholder="Search..." />; */
}
