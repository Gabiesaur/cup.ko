import React from 'react';
import type { ReactNode } from 'react';

interface PinkCardProps {
    title: string;
    icon?: string;
    children: ReactNode;
}

const PinkCard: React.FC<PinkCardProps> = ({ title, icon, children }) => {
    return (
        <div className='flex flex-col items-center w-full max-w-4xl mt-8 md:mt-0'>
            <div className='relative w-full md:w-[700px] h-auto md:h-[700px] bg-[#cc8386] rounded-3xl md:rounded-4xl flex flex-col justify-around items-center gap-6 md:gap-4 px-4 py-10 md:p-0 pb-8'>
                
                {/* Overlapping Title Header */}
                <button className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[4rem] md:h-20 w-[90%] md:w-[500px] bg-[#cc8386] rounded-full md:rounded-4xl flex flex-row justify-center items-center shadow-md'>
                    {icon && <img src={icon} alt="card icon" className='h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-0' />}
                    <p className='text-[#fbc208] text-2xl md:text-5xl font-bold leading-tight' style={{ fontFamily: "Opun Mai Bold Italic" }}>
                        {title}
                    </p>
                </button>

                {/* Card Content Container */}
                <div className='flex flex-col justify-around h-full pt-6 md:pt-8 gap-6 md:gap-0 w-full items-center'>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default PinkCard;