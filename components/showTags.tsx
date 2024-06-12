import { useState, useEffect } from "react";
import { Tag } from "@/types";
import { Button } from "@/components/ui/button";
import { getTags } from "@/api/getTags";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const ShowTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const getTagsFromApi = async () => {
            try {
                const data = await getTags();
                setTags(data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        getTagsFromApi();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-white bg-transparent hover:bg-gray-700 p-2 rounded-md">
                <Button>Tags</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-lg">
                {tags.map(tag => (
                    <Link href={`/tags/${tag.id}`} key={tag.id} passHref>
                        <DropdownMenuItem className="text-gray-900 hover:bg-gray-100 p-2">
                            {tag.name}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ShowTags;