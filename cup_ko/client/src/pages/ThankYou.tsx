import React from 'react';
import { useNavigate } from 'react-router';
import food_images from '../assets/food_images.png';
import landing_bg from '../assets/landing_bg.png';
import logo from '../assets/logo.png';
import ust_logo from '../assets/ust_logo.png';

const ThankYouPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-dvh md:h-screen md:min-h-[700px] overflow-x-hidden overflow-y-auto md:overflow-hidden bg-[#fdfaf0]">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={landing_bg}
                    alt="Abstract pastel cloud background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Logos - Desktop View (Side by Side) */}
            <div className="hidden md:block absolute top-2 left-2 z-20">
                <img
                    src={logo}
                    alt="Trese Chewy Cake Logo"
                    className="w-40 drop-shadow-md"
                />
            </div>
            <div className="hidden md:block absolute top-2 left-50 z-20">
                <img
                    src={ust_logo}
                    alt="UST Logo"
                    className="w-40 drop-shadow-md"
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full min-h-dvh md:h-full max-w-[1440px] flex flex-col justify-center lg:pl-10 py-12 md:py-0">

                {/* Logos - Mobile View (Stacked) - Placed in document flow to prevent overlap */}
                <div className="flex flex-col items-center gap-4 z-20 md:hidden w-full mb-8 pt-4 shrink-0">
                    <img
                        src={logo}
                        alt="Trese Chewy Cake Logo"
                        className="w-40 drop-shadow-md"
                    />
                    <img
                        src={ust_logo}
                        alt="UST Logo"
                        className="w-40 drop-shadow-md"
                    />
                </div>

                {/* Left Column: Typography & CTA */}
                <div className="w-full md:w-[50%] flex flex-col items-center md:items-start z-20 md:pl-20 shrink-0">
                    <h1
                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                        className="text-center md:text-left text-5xl md:text-6xl lg:text-7xl font-bold text-[#CE828E] leading-[1.1] italic mb-4"
                    >
                        Thank You!
                    </h1>

                    <p
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                        className="text-center md:text-left text-2xl md:text-3xl text-[#CE828E] mb-8 px-4 md:px-0"
                    >
                        Your order has been received.<br />
                        We'll prepare your treats with love!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start mt-5 px-4 md:px-0">
                        <button
                            onClick={() => navigate('/')}
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                            className="bg-[#CE828E] text-white text-2xl w-full sm:w-[200px] h-[50px] flex items-center justify-center rounded-xl hover:bg-[#b86d7a] transition-all duration-300 shadow-sm whitespace-nowrap"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate('/order')}
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                            className="bg-white text-[#CE828E] border-2 border-[#CE828E] text-2xl w-full sm:w-[200px] h-[50px] flex items-center justify-center rounded-xl hover:bg-[#fdfaf0] transition-all duration-300 shadow-sm whitespace-nowrap"
                        >
                            Order Again
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Floating Food Images — behind text */}
            <div className="hidden md:flex absolute top-0 right-0 w-[65%] md:w-[72%] h-full items-center justify-end pointer-events-none z-0 md:pt-25">
                <img
                    src={food_images}
                    alt="Assortment of chewy cakes"
                    className="w-full h-full object-contain object-right drop-shadow-2xl"
                />
            </div>
        </div>
    );
};

export default ThankYouPage;