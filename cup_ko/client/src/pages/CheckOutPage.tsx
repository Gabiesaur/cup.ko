import React from 'react';
import { useNavigate } from 'react-router-dom';
import mob_bg from '../assets/main_bg.png';

const CheckOutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="flex justify-center items-center overflow-hidden gap-8"
            style={{
                backgroundImage: `url(${mob_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <div className='flex flex-col items-center'>
                <div className='relative h-200 w-450 bg-[#cc8386] rounded-4xl flex flex-col justify-around items-center gap-4'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-125 bg-[#cc8386] rounded-4xl flex flex-row justify-center items-center'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutPage;