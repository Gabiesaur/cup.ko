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
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Top Left Logo */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-2 md:left-2 md:translate-x-0 z-20">
                <img
                    src={logo}
                    alt="Trese Chewy Cake Logo"
                    className="w-60 lg:w-75 drop-shadow-md"
                />
            </div>

            {/* Main Content Container (Now ONLY holding the text safely inside the margins) */}
            <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex flex-col justify-center mr-10 md:mr-25 lg:mr-85">

                {/* Left Column: Typography & CTA */}
                <div className="w-full md:w-[50%] flex flex-col items-center md:items-start z-20 pt-32 md:pt-0">
                    <h1
                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                        /* Added text-center for mobile, md:text-left for desktop */
                        className="w-1000 text-center md:text-left text-5xl md:text-6xl lg:text-7xl font-bold text-[#CE828E] leading-[1.1] italic mb-8"
                    >
                        Chewy with a <br />
                        Tropical Soul.
                    </h1>

                    {/* Added a wrapper with flex justify-center on mobile, md:justify-start on desktop */}
                    <div className="flex w-full justify-center md:justify-start mt-5">
                        <button
                            onClick={() => navigate('/mode')}
                            style={{ fontFamily: "'Pangolin', cursive" }}
                            className="bg-[#CE828E] text-white text-2xl w-[200px] h-[50px] flex items-center justify-center rounded-xl hover:bg-[#b86d7a] transition-all duration-300 shadow-sm whitespace-nowrap"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Floating Food Images (BROKEN OUT of the padded container) */}
            {/* 'absolute top-0 right-0' forces this box to touch the exact right edge of your browser window */}
            <div className="hidden md:flex absolute top-2 right-8 w-full md:w-[50%] lg:w-[55%] h-full items-center justify-end pointer-events-none z-10">
                <img
                    src={food_images}
                    alt="Assortment of chewy cakes"
                    /* 'object-right' anchors the image graphic perfectly to the right side of its box. 
                       Use 'translate-x-4' (or a larger number) if you want it to bleed off the screen slightly like your mockup! */
                    className="w-full object-contain object-right drop-shadow-2xl translate-x-4 md:translate-x-8"
                />
            </div>
        </div>
    );
};

export default LandingPage;