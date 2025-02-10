"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Use Next.js Image component for optimized images
import image3 from "@/public/assets/dashboard/image3.jpeg"

const PageWithPopup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Trigger the image pop-up when the component mounts
    useEffect(() => {
        setIsModalOpen(true); // Set this to true to show the modal on page load
    }, []);

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Image Modal */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        {/* Display Image */}
                        <Image
                            src={image3}
                            alt="Pop-up Image"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageWithPopup;
