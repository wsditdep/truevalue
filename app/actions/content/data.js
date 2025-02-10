"use server";

import { Content } from "@/modals/Content";
import { connectToDB } from "@/utils/connection";

export const fetchContent = async () => {
    try {
        await connectToDB();

        const content = await Content.find();

        return content;
    } catch (error) {
        console.log(error)
    }
}