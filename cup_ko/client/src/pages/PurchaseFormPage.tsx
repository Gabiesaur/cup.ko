import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cart from "../assets/cart.png";
import PageLayout from "../components/PageLayout";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type BuyingMode = "physical" | "delivery" | "reservation";

const PurchaseFormPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };
    const [mode, setMode] = useState<BuyingMode>(
        (location.state?.mode as BuyingMode) || "delivery",
    );
    const [name, setName] = useState("");
    const [roomBuilding, setRoomBuilding] = useState("");
    const [username, setUsername] = useState("");

    // Initialize with today's date at 12:00 PM for better UX
    const getTodayDefault = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}T12:00`;
    };

    const [pickupTime, setPickupTime] = useState(getTodayDefault());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentMode, setPaymentMode] = useState<"gcash" | "cash" | "">("");
    const [payingNow, setPayingNow] = useState(false);

    useEffect(() => {
        console.log(roomBuilding);
    }, [roomBuilding]);

    const handleModeSelect = (selectedMode: BuyingMode) => {
        setMode(selectedMode);
        setIsDropdownOpen(false);
    };

    const handleSave = async () => {
        if (!name || !paymentMode) {
            alert("Please fill in all required fields");
            return;
        }

        if (mode === "delivery" && !roomBuilding) {
            alert("Please enter room & building");
            return;
        }

        if (mode === "reservation" && !pickupTime) {
            alert("Please select pickup time");
            return;
        }

        if ((mode === "delivery" || mode === "reservation") && !username) {
            alert("Please enter your IG/FB contact");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/saveOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    modePayment: paymentMode,
                    customerName: name,
                    items: items || [],
                    totalPrice: total || 0,
                    modeBuying: mode,
                    customerUsername: username,
                    roomBuilding,
                    pickupTime: mode === "reservation" ? new Date(pickupTime).toISOString() : null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("order saved");

                if (payingNow) {
                    navigate("/payment", { state: { orderId: data.orderId } });
                } else {
                    navigate("/thank-you");
                }
            } else {
                const errorData = await response.json();
                console.error("Server error:", errorData);
                alert("Failed to save order: " + (errorData.error || "Unknown error"));
            }
        } catch (err) {
            console.error("order fail", err);
            alert("Error saving order");
        }
    };

    return (
        <PageLayout>
            <div className="flex flex-col items-center z-10 w-full max-w-[650px]">
                {/* Main Pink Container */}
                <div className="relative h-auto md:h-[650px] w-full md:w-[650px] bg-[#cc8386] rounded-[40px] flex flex-col justify-start items-start pt-16 md:pt-10 px-6 md:px-12 pb-20 md:pb-12 gap-6 shadow-lg">
                    {/* Header Badge / Dropdown Container */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-50 flex flex-col items-center">
                        {/* Main Button */}
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="h-20 w-full bg-[#cc8386] rounded-[40px] flex flex-row justify-center items-center gap-4 cursor-pointer hover:opacity-95 transition-opacity shadow-md"
                        >
                            <img src={cart} alt="cart" className="h-10 w-10" />
                            <p
                                className="text-[#f8cc1b] text-5xl font-bold [text-shadow:2px_3px_2px_#a8606c]"
                                style={{ fontFamily: "Opun Mai Bold Italic" }}
                            >
                                {mode}
                            </p>
                            <span
                                className={`text-[#f8cc1b] text-3xl transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                            >
                                ▼
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-24 w-[90%] bg-[#cc8386] rounded-[20px] flex flex-col overflow-hidden shadow-xl border-2 border-[#f8cc1b]/20">
                                {["physical", "delivery", "reservation"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleModeSelect(option as BuyingMode)}
                                        className={`py-3 px-6 text-[#f8cc1b] text-3xl font-bold hover:bg-[#b06f72] transition-colors ${mode === option ? "bg-[#b06f72]" : ""}`}
                                        style={{ fontFamily: "Opun Mai Bold Italic" }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Group 1: Name */}
                    <div className="w-full flex flex-col gap-2 relative z-0">
                        <label
                            className="text-[#873641] text-2xl font-bold"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Mode of Payment */}
                    <div className="w-full flex flex-col gap-4 relative z-0">
                        <label
                            className="text-[#873641] text-2xl font-bold"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                        >
                            Mode of Payment:
                        </label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPaymentMode("gcash")}
                                className={`flex-1 py-4 px-6 rounded-full text-xl font-bold transition-colors ${paymentMode === "gcash" ? "bg-[#f8cc1b] text-[#873641]" : "bg-[#fce18d] text-[#873641] hover:bg-[#f8cc1b]"}`}
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                GCash
                            </button>
                            <button
                                onClick={() => setPaymentMode("cash")}
                                className={`flex-1 py-4 px-6 rounded-full text-xl font-bold transition-colors ${paymentMode === "cash" ? "bg-[#f8cc1b] text-[#873641]" : "bg-[#fce18d] text-[#873641] hover:bg-[#f8cc1b]"}`}
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                Cash
                            </button>
                        </div>

                        {paymentMode === "gcash" && (
                            <label
                                className="flex items-center gap-3 cursor-pointer select-none"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                <input
                                    type="checkbox"
                                    checked={payingNow}
                                    onChange={(e) => setPayingNow(e.target.checked)}
                                    className="w-5 h-5 accent-[#f8cc1b] cursor-pointer"
                                />
                                <span className="text-[#873641] text-xl font-bold">Paying Now?</span>
                            </label>
                        )}
                    </div>

                    {/* Delivery Specific */}
                    {mode === "delivery" && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
                            <label
                                className="text-[#873641] text-2xl font-bold"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                Room & building to deliver:
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                                onChange={(e) => setRoomBuilding(e.target.value)}
                            />
                            <ul
                                className="list-disc pl-6 text-[#873641] text-sm leading-tight pr-4 mt-1 opacity-80"
                                style={{ fontFamily: "sans-serif" }}
                            >
                                <li>
                                    Please know that delivery takes time as we are occupied in handling orders. Ensure that you are present in the room of receiving delivery.
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Reservation Specific */}
                    {mode === "reservation" && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
                            <label
                                className="text-[#873641] text-2xl font-bold"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                Time and Date of pickup:
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Shared: Contact */}
                    {(mode === "delivery" || mode === "reservation") && (
                        <div className="w-full flex flex-col gap-2 relative z-0">
                            <label
                                className="text-[#873641] text-2xl font-bold"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                            >
                                IG/FB contact:
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70"
                                style={{ fontFamily: "'Patrick Hand', cursive" }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <ul
                                className="list-disc pl-6 text-[#873641] text-sm leading-tight pr-4 mt-1 opacity-80"
                                style={{ fontFamily: "sans-serif" }}
                            >
                                <li>
                                    This will serve as the mode of communication for contacting purposes only.
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Next Button */}
                    <button
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-6 bg-[#fce18d] text-[#e1a0aa] text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-14 py-3 shadow-md z-0"
                        style={{ fontFamily: "Opun Mai Bold Italic", fontWeight: "bold" }}
                        onClick={handleSave}
                    >
                        Next
                    </button>
                </div>
            </div>
        </PageLayout>
    );
};

export default PurchaseFormPage;