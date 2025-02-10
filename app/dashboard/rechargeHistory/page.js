import { fetchRechargeHistory } from "@/app/actions/history/data";
import { fetchAuthenticatedUser } from "@/app/actions/user/data";
import { auth } from "@/app/auth";
import SecurityCheck from "@/components/checkSecurityCode/CheckSecurityCode";
import RechargeHistory from "@/components/rechargeHistory/RechargeHistory";

export const dynamic = "force-dynamic"

const page = async () => {

    const { user: logedinUser } = await auth();

    const user = await fetchAuthenticatedUser();

    const recharge = await fetchRechargeHistory() || [];

    return (
        <>
            <RechargeHistory
                history={JSON.parse(JSON.stringify(recharge))}
                authUser={JSON.parse(JSON.stringify(user))}
            />
            <SecurityCheck
                user={JSON.parse(JSON.stringify(logedinUser))}
                authenticatedUser={JSON.parse(JSON.stringify(user))}
            />
        </>
    )
}

export default page