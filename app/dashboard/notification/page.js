import { fetchAuthenticatedUser } from '@/app/actions/user/data';
import { auth } from '@/app/auth';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';

export const dynamic = "force-dynamic"

const page = async () => {
    const { user: logedinUser } = await auth();

    const user = await fetchAuthenticatedUser();
    return (
        <>
            <Notification />
            <SecurityCheck
                user={JSON.parse(JSON.stringify(logedinUser))}
                authenticatedUser={JSON.parse(JSON.stringify(user))}
            />
        </>
    )
}

export default page