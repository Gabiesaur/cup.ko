import React from 'react';
import { useNavigate } from 'react-router-dom';
import food_images from '../assets/food_images.png';
import landing_bg from '../assets/landing_bg.png';
import logo from '../assets/logo.png';
import ust_logo from '../assets/ust_logo.png';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-dvh lg:h-screen lg:min-h-[700px] overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-[#fdfaf0]">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={landing_bg}
                    alt="Abstract pastel cloud background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Logos - Desktop View (Side by Side) */}
            <div className="hidden lg:block absolute top-2 left-2 z-20">
                <img
                    src={logo}
                    alt="Trese Chewy Cake Logo"
                    className="w-42 drop-shadow-md"
                />
            </div>
            <div className="hidden lg:block absolute top-2 left-50 z-20">
                <img
                    src={ust_logo}
                    alt="UST Logo"
                    className="w-40 drop-shadow-md"
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full min-h-dvh lg:h-full max-w-[1440px] flex flex-col justify-center lg:pl-10 py-12 lg:py-0">

                {/* Logos - Mobile View (Stacked) - Placed in document flow to prevent overlap */}
                <div className="flex flex-col items-center gap-4 z-20 lg:hidden w-full mb-8 pt-4 shrink-0">
                    <img
                        src={logo}
                        alt="Trese Chewy Cake Logo"
                        className="w-42 drop-shadow-md"
                    />
                    <img
                        src={ust_logo}
                        alt="UST Logo"
                        className="w-40 drop-shadow-md"
                    />
                </div>

                {/* Left Column: Typography & CTA */}
                <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start z-20 lg:pl-20 shrink-0">
                    <h1
                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                        className="w-full text-center lg:text-left text-5xl md:text-6xl lg:text-7xl font-bold text-[#CE828E] leading-[1.1] italic mb-8"
                    >
                        Chewy with a <br />
                        Tropical Soul.
                    </h1>

                    <div className="flex w-full justify-center lg:justify-start mt-5">
                        <button
                            onClick={() => navigate('/order')}
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                            className="bg-[#CE828E] text-white text-2xl w-[200px] h-[50px] flex items-center justify-center rounded-xl hover:bg-[#b86d7a] transition-all duration-300 shadow-sm whitespace-nowrap"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Image */}
            <div className="lg:hidden absolute inset-0 z-5 flex justify-center items-center pointer-events-none opacity-25 px-4 overflow-hidden">
                <img
                    src={food_images}
                    alt="Assortment of chewy cakes"
                    className="w-full max-w-[600px] md:max-w-[800px] object-contain drop-shadow-2xl
                    mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent),linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] mask-intersect"
                />
            </div>

            {/* Right Column: Floating Food Images — behind text */}
            <div className="hidden lg:flex absolute top-0 right-0 lg:w-[50%] xl:w-[65%] 2xl:w-[72%] h-full items-center justify-end pointer-events-none z-0 lg:pt-25">
                <img
                    src={food_images}
                    alt="Assortment of chewy cakes"
                    className="w-full h-full object-contain object-right drop-shadow-2xl"
                />
            </div>
        </div>
    );
};

export default LandingPage;