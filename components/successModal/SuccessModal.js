"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SuccessModal = ({ title, subtitle, img, redirect, setIsSuccess }) => {
  const { push } = useRouter();

  const handleRedirect = () => {
    push(redirect);
    setIsSuccess(false);
    return;
  }

  return (
    <div className="success-modal-wrapper">
      <div className="success-modal-inner-wrapper">
        <Image
          src={img}
          height={100}
          width={100}
          alt="logo"
          unoptimized
        />
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button onClick={() => handleRedirect()} className="primary-btn">CLOSE</button>
      </div>
    </div>
  )
}

export default SuccessModal