import { fetchAuthenticatedUser } from '@/app/actions/user/data';
import { auth } from '@/app/auth';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';
import { Profile } from '@/components/profile/Profile';

export const dynamic = "force-dynamic"

const page = async () => {
    const { user: logedinUser } = await auth();

    const user = await fetchAuthenticatedUser();
    return (
        <>
            <Profile user={JSON.parse(JSON.stringify(user))} />
            <SecurityCheck
                user={JSON.parse(JSON.stringify(logedinUser))}
                authenticatedUser={JSON.parse(JSON.stringify(user))}
            />
        </>
    )
}

export default page