import React from 'react';
import { useNavigate } from 'react-router-dom';
import main_bg from '../assets/main_bg.png';
import cart from '../assets/cart.png';
import left from '../assets/mob_left.png';
import right from '../assets/mob_right.png';

const PaymentFormPage: React.FC = () => {
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
            <img src={left} className='w-[20%] hidden md:block' alt="Left decorative" />

            <div className='flex flex-col items-center z-10'>
                {/* Main Pink Container */}
                {/* Kept your dimensions but changed to justify-start and added padding (pt-28 px-12) for the form layout */}
                <div className='relative h-[650px] w-[650px] bg-[#cc8386] rounded-[40px] flex flex-col justify-start items-start pt-32 px-12 pb-12 gap-6 shadow-lg'>

                    {/* Header Badge */}
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-[450px] bg-[#cc8386] rounded-[40px] flex flex-row justify-center items-center gap-4'>
                        <img src={cart} alt="cart" className='h-10 w-10' />
                        {/* Changed text color to yellow and updated to 'delivery' */}
                        <p className='text-[#f8cc1b] text-5xl font-bold [text-shadow:2px_3px_2px_#a8606c]' style={{ fontFamily: "Opun Mai Bold Italic" }}>
                            delivery
                        </p>
                    </div>

                    {/* Form Group 1: Name */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                            Name:
                        </label>
                        <input
                            type="text"
                            className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        />
                    </div>

                    {/* Form Group 2: Room & Building */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                            Room & building to deliver:
                        </label>
                        <input
                            type="text"
                            className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        />
                        <ul className="list-disc pl-6 text-[#873641] text-sm leading-tight pr-4 mt-1 opacity-80" style={{ fontFamily: "sans-serif" }}>
                            <li>Please know that delivery takes time as we are occupied in handling orders. Ensure that you are present in the room of receiving delivery.</li>
                        </ul>
                    </div>

                    {/* Form Group 3: Contact */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                            ig/fb contact:
                        </label>
                        <input
                            type="text"
                            className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        />
                        <ul className="list-disc pl-6 text-[#873641] text-sm leading-tight pr-4 mt-1 opacity-80" style={{ fontFamily: "sans-serif" }}>
                            <li>This will serve as the mode of communication for contacting purposes only.</li>
                        </ul>
                    </div>

                    {/* Next Button */}
                    {/* Positioned absolutely to break out of the container's padding at the bottom right */}
                    <button
                        className="absolute -bottom-6 -right-6 bg-[#fce18d] text-[#e1a0aa] text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-14 py-3 shadow-md"
                        style={{ fontFamily: "Opun Mai Bold Italic", fontWeight: 'bold' }}
                    >
                        Next
                    </button>

                </div>
            </div>

            <img src={right} className='w-[20%] hidden md:block' alt="Right decorative" />
        </div>
    );
};

export default PaymentFormPage;