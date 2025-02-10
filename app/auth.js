import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/connection";
import { User } from "@/modals/User";
import { LoginHistory } from "@/modals/LogHistory";
import axios from "axios";
import { headers } from 'next/headers'

const login = async (credentials) => {
    
    try {
        await connectToDB();

        const user = await User.findOne({
            $and: [
                {
                    $or: [
                        { username: credentials.username },
                        { phone_number: credentials.username }
                    ]
                },
                // {
                //     role: { $in: ['user', 'practice', 'agent'] }
                // }
            ]
        });


        if (!user) {
            return null;
        }

        if (!user?.status) {
            return null
        }

        // if (user?.role === "user" || user?.role === "practice" || user?.role === "agent") {

        // } else {
        //     return null
        // }

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return null
        }

        const headersList = headers();
        const xRealIp = headersList.get('x-real-ip');
        // const xRealIp = "203.144.68.208";

        var deviceIP = xRealIp || "Unknown";

        const res = await axios.get(`http://ip-api.com/json/${deviceIP}`);
        const data = res.data;

        if (res.status === 200) {
            await LoginHistory.create({
                username: user?.username,
                phone_number: user?.phone_number,
                ip_address: deviceIP,
                country_name: data?.country,
                region_name: data?.regionName,
                city_name: data?.city
            });
        }

        return user;
    } catch (err) {
        console.log(err);
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user
            session.user = user
            return session
        }
    }
});