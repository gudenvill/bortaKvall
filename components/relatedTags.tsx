import { useEffect, useState } from "react";
import Link from "next/link";
import { Tag } from "@/types";

type RelatedTagsProps = {
    tags: Tag[];
};

const RelatedTags = ({ tags }: RelatedTagsProps) => {
    if (!tags || tags.length === 0) return <div>No tags available</div>;

    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {tags.map((tag) => (
                <Link href={`/tags/${tag.id}`} key={tag.id}>
                    <div className="bg-gray-200 text-black p-2 rounded-md hover:bg-gray-300">
                        {tag.name}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedTags;