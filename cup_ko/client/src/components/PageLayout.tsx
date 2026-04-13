import React from 'react';
import type { ReactNode } from 'react';
import mob_bg from '../assets/mob_bg.png';
import left from '../assets/mob_left.png';
import right from '../assets/mob_right.png';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div
            className="flex justify-center items-center overflow-hidden gap-2 md:gap-8 min-h-screen w-full px-4 py-12 md:py-0 md:px-0"
            style={{
                backgroundImage: `url(${mob_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <img src={left} className='hidden md:block w-[15%] lg:w-[20%]' alt="left decoration" />
            
            {/* The main content gets injected here */}
            {children}

            <img src={right} className='hidden md:block w-[15%] lg:w-[20%]' alt="right decoration" />
        </div>
    );
};

export default PageLayout;