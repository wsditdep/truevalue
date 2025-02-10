import { fetchAuthenticatedUser } from '@/app/actions/user/data';
import { auth } from '@/app/auth';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';
import SubmitJourney from '@/components/submitJourney/SubmitJourney';
export const dynamic = "force-dynamic"

const page = async () => {

    const { user: logedinUser } = await auth();
    const user = await fetchAuthenticatedUser() || {};

    return (
        <>
            <Breadcrumb link="/dashboard" title="Design Creation" authUser={JSON.parse(JSON.stringify(user))} />

            <SubmitJourney
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