"use server";

import { Notice } from "@/modals/Notice";
import { Setting } from "@/modals/Setting";
import { Support } from "@/modals/Support";
import { connectToDB } from "@/utils/connection";

export const fetchNotice = async () => {
    try {
        await connectToDB();

        const notice = await Notice.find();

        return notice;
    } catch (error) {
        console.log(error)
    }
}

export const fetchSetting = async () => {
    try {
        await connectToDB();

        const setting = await Setting.findOne();

        return setting;
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

