import React from 'react';
import type { ReactNode } from 'react';
import mob_bg from '../assets/main_bg.png';
import left from '../assets/mob_left.png';
import right from '../assets/mob_right.png';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div
            className="relative flex justify-center items-center min-h-screen w-full py-8 md:py-12"
            style={{
                backgroundImage: `url(${mob_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <img src={left} className='hidden md:block absolute left-0 w-[22%] lg:w-[28%] z-0' alt="left decoration" />

            {/* The main content gets injected here */}
            <div className="z-10">
                {children}
            </div>

            <img src={right} className='hidden md:block absolute right-0 w-[22%] lg:w-[28%] z-0' alt="right decoration" />
        </div>
    );
};

export default PageLayout;