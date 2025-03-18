"use server";

import { Content } from "@/modals/Content";
import { Support } from "@/modals/Support";
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

export const fetchSupport = async () => {
    try {
        await connectToDB();

        const support = await Support.findOne();

        return support;
    } catch (error) {
        console.log(error)
    }
}