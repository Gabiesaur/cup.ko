import React from 'react';
import { useNavigate } from 'react-router-dom';
import food_images from '../assets/food_images.png';
import landing_bg from '../assets/landing_bg.png';
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#fdfaf0]">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0">
                <img
                    src={landing_bg}
                    alt="Abstract pastel cloud background"
                    className="w-full h-full object-cover object-left"
                />
            </div>

            {/* Top Left Logo */}
            <div className="absolute top-6 left-6 md:top-2 md:left-2 z-20">
                <img
                    src={logo}
                    alt="Trese Chewy Cake Logo"
                    /* explicitly sizing the logo so it doesn't take over the screen */
                    className="w-75 sm:w-75 md:w-75 drop-shadow-md"
                />
            </div>

            {/* Main Content Container */}
            {/* Added pt-40 on mobile to clear the absolute positioned logo */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 lg:px-28 pt-40 md:pt-0">

                {/* Left Column: Typography & CTA */}
                <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-start z-20 translate-x-10 md:translate-x-25">
                    <h1
                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#CE828E] leading-tight italic mb-8"
                    >
                        Chewy with a <br />
                        Tropical Soul.
                    </h1>

                    <div>
                        <button
                            onClick={() => navigate('/mode')}
                            style={{ fontFamily: "'One Little Font', sans-serif" }}
                            className="bg-[#CE828E] text-white text-lg md:text-xl lg:text-2xl px-10 py-3 rounded-[20px] hover:bg-[#b86d7a] transition-colors duration-300 shadow-md"
                        >
                            Order Now
                        </button>
                    </div>
                </div>

                {/* Right Column: Floating Food Images */}
                {/* Changed to 'items-end' and 'justify-end' to force the contents to the bottom right */}
                <div className="w-full md:w-[55%] h-full flex items-end justify-end relative pointer-events-none z-10">
                    <img
                        src={food_images}
                        alt="Assortment of chewy cakes"
                        /* Translate classes gently push it past the container padding to touch the edges */
                        className="w-full max-w-[800px] object-contain drop-shadow-2xl translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-12 lg:translate-x-20 lg:translate-y-12"
                    />
                </div>

            </div>
        </div>
    );
};

export default LandingPage;