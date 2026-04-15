import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cart from '../assets/cart.png';
import gcashQr from '../assets/gcash_qr.jpg';

import PageLayout from '../components/PageLayout';
import PinkCard from '../components/PinkCard';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    const [referenceNumber, setReferenceNumber] = useState('');

    const handleNext = async () => {
        if (!referenceNumber.trim()) {
            alert('Please enter your GCash reference number.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/updateOrder/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gcashRefNo: referenceNumber.trim() }),
            });

            if (response.ok) {
                console.log('Order updated with ref no.');
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                alert('Failed to update order: ' + (errorData.error || 'Unknown error'));
            }
        } catch (err) {
            console.error('Update failed:', err);
            alert('Error updating order');
        }
    };

    const handlePayLater = () => {
        navigate('/');
    };

    return (
        <PageLayout>
            <PinkCard title="gcash payment" icon={cart}>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-2 w-full px-4">
                    <p
                        className="text-[#873641] text-base md:text-lg font-bold text-center"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                    >
                        Scan the QR code below to pay via GCash / InstaPay
                    </p>
                    <img
                        src={gcashQr}
                        alt="GCash QR Code"
                        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl shadow-md object-contain bg-white p-1"
                    />
                </div>

                {/* Reference Number Input */}
                <div className="w-full flex flex-col gap-2 px-4 md:px-10">
                    <label
                        className="text-[#873641] text-xl md:text-2xl font-bold"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                    >
                        Reference Number:
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. 1234567890"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        className="w-full bg-[#fce18d] text-[#873641] rounded-full px-5 py-3 md:px-6 md:py-4 text-base md:text-xl outline-none placeholder-[#873641]/60"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                    />
                    <ul
                        className="list-disc pl-6 text-[#873641] text-sm leading-tight pr-4 mt-1 opacity-80"
                        style={{ fontFamily: 'sans-serif' }}
                    >
                        <li>
                            Enter the 13-digit reference number shown in your GCash receipt after payment.
                        </li>
                    </ul>
                </div>

                {/* Buttons Row */}
                <div className="relative w-full flex justify-between items-center px-4 md:px-10 pb-2">
                    {/* Pay Later */}
                    <button
                        onClick={handlePayLater}
                        className="bg-[#fce18d] text-[#e1a0aa] text-2xl md:text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-8 md:px-12 py-3 shadow-md font-bold"
                        style={{ fontFamily: 'Opun Mai Bold Italic' }}
                    >
                        Pay Later
                    </button>

                    {/* Next */}
                    <button
                        onClick={handleNext}
                        className="bg-[#fce18d] text-[#e1a0aa] text-2xl md:text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-10 md:px-14 py-3 shadow-md font-bold"
                        style={{ fontFamily: 'Opun Mai Bold Italic' }}
                    >
                        Next
                    </button>
                </div>

            </PinkCard>
        </PageLayout>
    );
};

export default PaymentPage;
