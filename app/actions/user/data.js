"use server";

import { auth } from "@/app/auth";
import { Commission } from "@/modals/Commission";
import { User } from "@/modals/User";
import { Withdrawal } from "@/modals/Withdrawal";
import { connectToDB } from "@/utils/connection";
import { WithdrawalHistory } from "@/modals/WithdrawalHistory";
import { authenticate, withdrawal } from "./action";

export const fetchUser = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 10;

    try {
        connectToDB();

        const count = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["user", "practice"] } }
            ]
        }).count();


        const users = await User.find({
            $and: [
                { username: { $regex: regex } },
                { role: { $in: ["user", "practice"] } }
            ]
        })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        return { users, count };
    } catch (error) {
        console.log(error)
    }
}

export const fetchAuthenticatedUser = async () => {
    try {
        connectToDB();

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
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        return authenticatedUser;

    } catch (error) {
        console.log(error)
    }
}

export const fetchMembership = async () => {
    try {
        connectToDB();

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
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        const membership = await Commission.findOne({ membership_name: authenticatedUser?.membership_level });

        return membership;

    } catch (error) {
        console.log(error)
    }
}

export const fetchPendingWithdrawal = async () => {
    try {
        connectToDB();

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
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        let pendingWithdrawal;
        if (authenticatedUser?.withdrawal !== null) {
            const withdrawal = await Withdrawal.findById(authenticatedUser?.withdrawal);

            pendingWithdrawal = withdrawal?.wallet?.filter(item => item.status === "pending")[0]
        }

        if (!pendingWithdrawal) {
            return {}
        }

        return pendingWithdrawal;

    } catch (error) {
        console.log(error)
    }
}

export const fetchWithdrawal = async () => {
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
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        // const withdrawals = await WithdrawalHistory.find({ username: authenticatedUser?.username });
        const withdrawal = await Withdrawal.findById(authenticatedUser?.withdrawal);
        const withdrawals = withdrawal?.wallet;

        return withdrawals;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCommission = async () => {
    try {
        await connectToDB();

        const { user } = await auth();

        const commissions = await User.findById(user?._id);
        const allCommission = await Commission.find().sort({ commission_rate: 1 }) || [];

        const userCommission = commissions?.membership_level || {};

        return { allCommission, userCommission };
    } catch (error) {
        console.log(error);
    }
}



