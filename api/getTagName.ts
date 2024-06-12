import { Tag } from "@/types";

interface TagResponse {
    status: string;
    data: Tag;
}

export const getTagName = async (tagId: number): Promise<string> => {
    const response = await fetch(`https://www.bortakvall.se/api/v2/tags/${tagId}`);
    const jsonResponse = await response.json() as TagResponse;
    if (jsonResponse.status === "success") {
        return jsonResponse.data.name;
    } else {
        throw new Error("Failed to fetch tag name");
    }
}