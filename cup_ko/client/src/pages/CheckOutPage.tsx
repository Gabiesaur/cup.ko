import React from 'react';
import { useNavigate } from 'react-router-dom';
import main_bg from '../assets/main_bg.png';
import cart from '../assets/cart.png';

const CheckOutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="flex justify-center items-center overflow-hidden gap-8"
            style={{
                backgroundImage: `url(${main_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <div className='flex flex-col items-center'>
                <div className='relative h-200 w-450 bg-[#cc8386] rounded-4xl flex flex-col justify-around items-center gap-4'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-100 bg-[#cc8386] rounded-4xl flex flex-row justify-center items-center'>
                        <img src={cart} alt="cart" className='h-10 w-10' />
                        <p className='text-[#e1a0aa] text-6xl font-bold [text-shadow:2px_3px_2px_#a8606c]' style={{ fontFamily: "Opun Mai Bold Italic" }}>check out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutPage;