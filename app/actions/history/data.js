import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { JourneyHistory } from "@/modals/JourneyHistory";
import { User } from "@/modals/User";
import { connectToDB } from "@/utils/connection";
import { Recharge } from "@/modals/Recharge";


export const fetchHistory = async () => {

    try {
        await connectToDB();
        const { user } = await auth();

        if (!user) {
            return {
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        const authenticatedUser = await User.findOne({ _id: user?._id });

        if (!authenticatedUser) {
            return {
                message: `Unauthorized, data not found!`,
                status: 404,
                type: "danger"
            };
        }

        const journey = await JourneyHistory.findById(authenticatedUser?.journeyHistory);
        const history = journey?.JourneyHistory?.reverse();

        revalidatePath("/dashboard/history");
        return history;

    } catch (error) {
        console.log(error)
    }
}

export const fetchRechargeHistory = async () => {

    try {
        await connectToDB();
        const { user } = await auth();

        if (!user) {
            return {
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        const authenticatedUser = await User.findOne({ _id: user?._id });

        if (!authenticatedUser) {
            return {
                message: `Unauthorized, data not found!`,
                status: 404,
                type: "danger"
            };
        }

        const history = await Recharge.find({ 
            username: authenticatedUser?.username,
            recharge_type: "credit"
        });

        return history;

    } catch (error) {
        console.log(error)
    }
}