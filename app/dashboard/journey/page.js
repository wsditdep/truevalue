import React from 'react'
import { fetchAuthenticatedUser } from '@/app/actions/user/data';
import ValidateJourney from '@/components/journey/ValidateJourney';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';
import { auth } from '@/app/auth';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import Image from 'next/image';
import img1 from "@/public/assets/journey/img1.png"
import img2 from "@/public/assets/journey/img2.svg"
import img3 from "@/public/assets/journey/img3.svg"
import img4 from "@/public/assets/journey/img4.svg"
import img5 from "@/public/assets/journey/img5.svg"
import icon2 from "@/public/assets/journey/icon2.svg"
import icon3 from "@/public/assets/journey/icon3.svg"
import CirclerBar from '@/components/circlerBar/CirclerBar';

export const dynamic = "force-dynamic";

const page = async () => {

  const { user: logedinUser } = await auth();

  const user = await fetchAuthenticatedUser() || {};

  return (
    <>

      <Breadcrumb link="/dashboard" title="Design Creation" authUser={JSON.parse(JSON.stringify(user))} />

      <section className="journey-section">



        <div className='journey-wrapper'>

          <div className="journey-top-banner">
            <div className="banner">
              <Image
                src={img1}
                height={100}
                width={100}
                alt="bgimg"
                unoptimized
              />
            </div>
          </div>
          <div className='journey-info-wrapper'>
            <div className='journey-info-parent'>
              <div className='journey-info-child'>
                <div className='info'>
                  <p>Account Balance</p>
                  <h1><span>$</span> {user?.balance?.toFixed(2) ?? ""}</h1>
                </div>
                <div className='info'>
                  <p>Design In Progress</p>
                  <CirclerBar user={JSON.parse(JSON.stringify(user))} />
                </div>
              </div>
            </div>
            <div className='journey-info-parent'>
              <div className='journey-info-child'>
                <Image
                  src={icon2}
                  height={100}
                  width={100}
                  alt="bgimg"
                  unoptimized
                />
                <div className='balance'>
                  <p>Completed Commission</p>
                  <h3>$ {user?.balance?.toFixed(2) ?? ""}</h3>
                </div>
              </div>
              <div className='journey-info-child'>
                <Image
                  src={icon3}
                  height={100}
                  width={100}
                  alt="bgimg"
                  unoptimized
                />
                <div className='balance'>
                  <p>Total Completed</p>
                  <h3>$ {user?.today_commission?.toFixed(2) ?? ""}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className='journey-btn'>
            <ValidateJourney />
          </div>
        </div>
        <div className='seller-wrapper'>
          <div className='seller-heading'>
            <p>Design ideas for every space</p>
            <p>Our Best Seller</p>
          </div>
          <div className="home-appliances-wrapper">
            <div className="home-appliances">
              <div className="appliances-img">
                <Image
                  src={img2}
                  alt="icon"
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
              <div className="appliances-desc">
                <p>London Extendable TV Unit With Storage in Walnut and Black</p>
              </div>
            </div>
            <div className="home-appliances">
              <div className="appliances-img">
                <Image
                  src={img3}
                  alt="icon"
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
              <div className="appliances-desc">
                <p>Casper Extendable Modern TV Stand with Three Solid Wood Drawers</p>
              </div>
            </div>
            <div className="home-appliances">
              <div className="appliances-img">
                <Image
                  src={img4}
                  alt="icon"
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
              <div className="appliances-desc">
                <p>Amazon Coffee Table Set Modern Design with Glass Top Side Table (Set of 2)</p>
              </div>
            </div>
            <div className="home-appliances">
              <div className="appliances-img">
                <Image
                  src={img5}
                  alt="icon"
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
              <div className="appliances-desc">
                <p>Amsterdam Fabric Lounge (compact)</p>
              </div>
            </div>
          </div>
        </div>
      </section >

      <SecurityCheck
        user={JSON.parse(JSON.stringify(logedinUser))}
        authenticatedUser={JSON.parse(JSON.stringify(user))}
      />
    </>
  )
}

export default page;