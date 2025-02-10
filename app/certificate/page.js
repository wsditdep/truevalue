import Support from '@/components/support/Support'
import React from 'react'
import { fetchSupport } from '../actions/notice/data'
import Membership from '@/components/membership/Membership';
import Certificate from '@/components/content/Certificate';

const page = async () => {

    const support = await fetchSupport() || {};

    return (
        <>
            <Certificate/>
        </>
    )
}

export default page