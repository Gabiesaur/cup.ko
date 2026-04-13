import React from 'react';
import { useNavigate } from 'react-router-dom';
import mob_bg from '../assets/mob_bg.png';
import cart from '../assets/icon.png';
import left from '../assets/mob_left.png';
import right from '../assets/mob_right.png';

const ModePage: React.FC = () => {
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
            <img src={left} className='w-[20%]'/>
            <div className='flex flex-col items-center'>
                <div className='relative h-175 w-175 bg-[#cc8386] rounded-4xl flex flex-col justify-around items-center gap-4'>
                    <button className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-125 bg-[#cc8386] rounded-4xl flex flex-row justify-center items-center'>
                        <img src={cart} alt="cart" className='h-10 w-10' />
                        <p className='text-[#fbc208] text-5xl font-bold' style={{ fontFamily: "Opun Mai Bold Italic" }}>mode of buying</p>
                    </button>
                    <div className='flex flex-col justify-around h-[100%] pt-8'>
                        <div className='w-125'>
                            <div className='h-20 bg-[#fcd990] rounded-4xl flex justify-center items-center'>
                                <p className='text-[#e1a0aa] text-5xl font-bold' style={{ fontFamily: "Opun Mai Bold Italic" }}>Physical Store</p>
                            </div>
                            <ul className='pl-8'>
                                <li className='text-[#FFFFFF] list-disc text-xl'>
                                    Buying from the physical store means you are in line and will wait for your order in the physical store.
                                </li>
                            </ul>
                        </div>
                        
                        <div className='w-125'>
                            <div className='h-20 bg-[#fcd990] rounded-4xl flex justify-center items-center'>
                                <p className='text-[#e1a0aa] text-5xl font-bold' style={{ fontFamily: "Opun Mai Bold Italic" }}>Delivery</p>
                            </div>
                            <ul className='pl-8'>
                                <li className='text-[#FFFFFF] list-disc text-xl'>
                                    Mode of buying through delivery means your product will be delivered to you only available for classroom delivery in any school building. 
                                </li>
                            </ul>
                        </div>
                        <div className='w-125'>
                            <div className='h-20 bg-[#fcd990] rounded-4xl flex justify-center items-center'>
                                <p className='text-[#e1a0aa] text-5xl font-bold' style={{ fontFamily: "Opun Mai Bold Italic" }}>Reservation</p>
                            </div>
                            <ul className='pl-8'>
                                <li className='text-[#FFFFFF] list-disc text-xl'>
                                    Reservation means your product will be reserved for you and will be picked up when available or on a scheduled date by you or any person who will get it.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <img src={right} className='w-[20%]'/>
        </div>
    );
};

export default ModePage;