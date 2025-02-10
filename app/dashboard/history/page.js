import { fetchHistory } from '@/app/actions/history/data';
import { fetchAuthenticatedUser, fetchMembership } from '@/app/actions/user/data';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';
import History from '@/components/history/History';
import { auth } from "@/app/auth";

export const dynamic = "force-dynamic"

const page = async () => {

    const { user } = await auth();
    const authenticatedUser = await fetchAuthenticatedUser() || {};

    const history = await fetchHistory() || [];
    const membership = await fetchMembership();

    return (
        <>
            <section className="history-section">
                <History
                    membership={JSON.parse(JSON.stringify(membership))}
                    data={JSON.parse(JSON.stringify(history))}
                    authUser={JSON.parse(JSON.stringify(authenticatedUser))}
                />
            </section>
            <SecurityCheck
                user={JSON.parse(JSON.stringify(user))}
                authenticatedUser={JSON.parse(JSON.stringify(authenticatedUser))}
            />
        </>
    )
}

export default page