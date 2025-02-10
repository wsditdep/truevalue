// "use client";

// import { logout } from "@/app/actions/user/action";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const SecurityCheck = ({ user, authenticatedUser }) => {
//     const router = useRouter();

//     const checkSecurity = async () => {

//         const isBlocked = authenticatedUser?.status;

//         if (!isBlocked) {
//             await logout();
//             router.push("/");
//         } else if (user?.security_code !== authenticatedUser?.security_code) {
//             await logout();
//             router.push("/");
//         }
//     };

//     const throwOutAfter = async () => {
//         await logout();
//         router.push("/");
//     }

//     const throwUserOut = () => {
//         const valMin = 10 * 60000;
//         setTimeout(() => {
//             throwOutAfter();
//         }, [valMin])
//     }

//     useEffect(() => {
//         checkSecurity();
//         throwUserOut();
//     }, []);

//     return null;
// };

// export default SecurityCheck;

"use client";

import { logout } from "@/app/actions/user/action";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const SecurityCheck = ({ user, authenticatedUser }) => {
    const router = useRouter();
    const timeoutRef = useRef(null);

    const checkSecurity = async () => {
        const isBlocked = authenticatedUser?.status;

        if (!isBlocked || user?.security_code !== authenticatedUser?.security_code) {
            await logout();
            router.push("/");
        }
    };

    const throwOutAfter = async () => {
        await logout();
        router.push("/");
    };

    const resetTimeout = () => {
        const valMin = 10 * 60000;

        // Clear the existing timeout if it exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout and store it in the ref
        timeoutRef.current = setTimeout(() => {
            throwOutAfter();
        }, valMin);
    };

    useEffect(() => {
        checkSecurity();
        resetTimeout();

        // Clear timeout on component unmount
        return () => clearTimeout(timeoutRef.current);
    }, [user, authenticatedUser]);

    return null;
};

export default SecurityCheck;
