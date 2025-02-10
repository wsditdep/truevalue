"use server";

import { Setting } from "@/modals/Setting";
import { connectToDB } from "@/utils/connection";

export const fetchSetting = async () => {
    try {
        await connectToDB();

        const platformSetting = await Setting.findOne();
        return platformSetting;
        
    } catch (error) {

    }
}