import React from 'react';

interface InfoBlockProps {
    title: string;
    description: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, description }) => {
    return (
        <div className='w-full md:w-[500px]'>
            <div className='h-16 md:h-20 bg-[#fcd990] rounded-full md:rounded-4xl flex justify-center items-center'>
                <p className='text-[#e1a0aa] text-2xl md:text-5xl font-bold' style={{ fontFamily: "Opun Mai Bold Italic" }}>
                    {title}
                </p>
            </div>
            <ul className='pl-6 md:pl-8 mt-3'>
                <li className='text-[#FFFFFF] list-disc text-base md:text-xl'>
                    {description}
                </li>
            </ul>
        </div>
    );
};

export default InfoBlock;