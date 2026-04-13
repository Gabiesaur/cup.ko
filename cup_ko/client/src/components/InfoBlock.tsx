import React from 'react';

interface InfoBlockProps {
    title: string;
    description: string;
    onClick?: () => void; // Added an optional onClick handler
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, description, onClick }) => {
    return (
        <div className='w-full md:w-[500px]'>
            {/* Changed from div to button, added w-full and hover effects */}
            <button 
                type="button"
                onClick={onClick}
                className='w-full h-16 md:h-20 bg-[#fcd990] rounded-full md:rounded-4xl flex justify-center items-center hover:opacity-90 transition-opacity cursor-pointer border-none'
            >
                <p className='text-[#e1a0aa] text-2xl md:text-5xl font-bold m-0' style={{ fontFamily: "Opun Mai Bold Italic" }}>
                    {title}
                </p>
            </button>
            <ul className='pl-6 md:pl-8 mt-3'>
                <li className='text-[#FFFFFF] list-disc text-base md:text-xl'>
                    {description}
                </li>
            </ul>
        </div>
    );
};

export default InfoBlock;