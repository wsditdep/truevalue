import Support from '@/components/support/Support'
import React from 'react'
import { fetchSupport } from '../actions/notice/data'
import Membership from '@/components/membership/Membership';

const page = async () => {

    const support = await fetchSupport() || {};

    return (
        <>
            <Membership />
        </>
    )
}

export default page