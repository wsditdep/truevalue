import Support from '@/components/support/Support'
import React from 'react'
import { fetchSupport } from '../actions/notice/data'

const page = async () => {

    const support = await fetchSupport() || {};

    return (
        <Support
            isLink="notAuth"
            support={JSON.parse(JSON.stringify(support))}
        />
    )
}

export default page