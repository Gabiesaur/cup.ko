import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import main_bg from '../assets/main_bg.png';
import cart from '../assets/cart.png';
import left from '../assets/mob_left.png';
import right from '../assets/mob_right.png';

type BuyingMode = 'physical store' | 'delivery' | 'reservation';

const PaymentFormPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // States for handling the dropdown and selected form fields
    const [mode, setMode] = useState<BuyingMode>((location.state?.mode as BuyingMode) || 'delivery');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentMode, setPaymentMode] = useState<'gcash' | 'cash' | ''>('');

    // Helper to close dropdown if user selects an option
    const handleModeSelect = (selectedMode: BuyingMode) => {
        setMode(selectedMode);
        setIsDropdownOpen(false);
    };

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
                <div className='relative h-[650px] w-[650px] bg-[#cc8386] rounded-[40px] flex flex-col justify-start items-start pt-15 px-12 pb-12 gap-6 shadow-lg'>

                    {/* Header Badge / Dropdown Container */}
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 flex flex-col items-center'>

                        {/* Main Button */}
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='h-20 w-full bg-[#cc8386] rounded-[40px] flex flex-row justify-center items-center gap-4 cursor-pointer hover:opacity-95 transition-opacity shadow-md'
                        >
                            <img src={cart} alt="cart" className='h-10 w-10' />
                            <p className='text-[#f8cc1b] text-5xl font-bold [text-shadow:2px_3px_2px_#a8606c]' style={{ fontFamily: "Opun Mai Bold Italic" }}>
                                {mode}
                            </p>
                            <span className={`text-[#f8cc1b] text-3xl transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className='absolute top-24 w-[90%] bg-[#cc8386] rounded-[20px] flex flex-col overflow-hidden shadow-xl border-2 border-[#f8cc1b]/20'>
                                {['physical store', 'delivery', 'reservation'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleModeSelect(option as BuyingMode)}
                                        className={`py-3 px-6 text-[#f8cc1b] text-3xl font-bold hover:bg-[#b06f72] transition-colors ${mode === option ? 'bg-[#b06f72]' : ''}`}
                                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- DYNAMIC FORM FIELDS --- */}

                    {/* Form Group 1: Name (Common to all modes) */}
                    <div className="w-full flex flex-col gap-2 relative z-0">
                        <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                            Name:
                        </label>
                        <input
                            type="text"
                            className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4 relative z-0">
                        <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                            Mode of Payment:
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPaymentMode('gcash')}
                                className={`flex-1 py-4 px-6 rounded-full text-xl font-bold transition-colors ${paymentMode === 'gcash'
                                    ? 'bg-[#f8cc1b] text-[#873641]'
                                    : 'bg-[#fce18d] text-[#873641] hover:bg-[#f8cc1b]'
                                    }`}
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                GCash
                            </button>
                            <button
                                onClick={() => setPaymentMode('cash')}
                                className={`flex-1 py-4 px-6 rounded-full text-xl font-bold transition-colors ${paymentMode === 'cash'
                                    ? 'bg-[#f8cc1b] text-[#873641]'
                                    : 'bg-[#fce18d] text-[#873641] hover:bg-[#f8cc1b]'
                                    }`}
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                Cash
                            </button>
                        </div>
                    </div>

                    {/* Delivery Specific */}
                    {mode === 'delivery' && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
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
                    )}

                    {/* Reservation Specific */}
                    {mode === 'reservation' && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
                            <label className="text-[#873641] text-2xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                                Time of pickup:
                            </label>
                            <input
                                type="time"
                                className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            />
                        </div>
                    )}

                    {/* Shared: Contact (For Delivery & Reservation) */}
                    {(mode === 'delivery' || mode === 'reservation') && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
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
                    )}

                    {/* Next Button */}
                    <button
                        className="absolute -bottom-6 -right-6 bg-[#fce18d] text-[#e1a0aa] text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-14 py-3 shadow-md z-0"
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