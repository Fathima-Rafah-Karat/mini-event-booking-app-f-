import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import Navbar from "./navbar";
import { geteventbyid, createBooking } from "../api/eventdetail/details";

interface Event {
    _id: string;
    title: string;
    date: string;
    price: number;
    totalSeats: number;
    photo?: string;
    description?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const getImageUrl = (photo?: string) => {
    if (!photo || photo.trim() === "") {
        return "/fallback.jpg";
    }

    // If photo is already a complete URL
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
        return photo;
    }

    // Remove starting slash
    const imagePath = photo.replace(/^\/+/, "");

    // Create correct backend image URL
    if (imagePath.startsWith("uploads/")) {
        return `${BASE_URL}/${imagePath}`;
    }

    return `${BASE_URL}/uploads/${imagePath}`;
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [seats, setSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            setError("");
            try {
                const fetched = await geteventbyid(String(id));
                setEvent(fetched ?? null);
            } catch (err) {
                console.error("Fetch event failed:", err);
                setError("Failed to load event. Please try again.");
                toast.error("Failed to load event. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans">

            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <main className="px-[18px] pt-[15px]">

                <div className="mx-auto w-full max-w-[1000px]">

                    <Link to="/event" className="mb-[13px] block text-[12px] text-blue-700">
                        &lt; Back to events
                    </Link>

                    {loading ? (
                        <p className="py-[40px] text-center text-[13px] text-[#94a3b8]">
                            Loading event...
                        </p>
                    ) : error ? (
                        <p className="py-[40px] text-center text-[13px] text-red-500">
                            {error}
                        </p>
                    ) : !event ? (
                        <p className="py-[40px] text-center text-[13px] text-[#94a3b8]">
                            Event not found.
                        </p>
                    ) : (
                        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-[420px_1fr]">

                            {/* Image */}
                            {/* Image */}
                            <div className="flex h-[400px] items-center justify-center overflow-hidden rounded-[6px] bg-[#e5e7eb]">

                                <img
                                    src={getImageUrl(event.photo)}
                                    alt={event.title}
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        console.error("Photo loading error:", e.currentTarget.src);

                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "/fallback.jpg";
                                    }}
                                />

                            </div>

                            {/* Details */}
                            <div>

                                <h1 className="mb-[13px] text-[25px] font-bold leading-[25px] text-black tracking-[1px] ">
                                    {event.title}
                                </h1>

                                {/* Description */}
                                <p className="mb-[11px] text-[13px] leading-[20px] text-[#475569]">
                                    {event.description}
                                </p>

                                {/* Date */}
                                <div className="flex items-center gap-[14px] text-[13px] text-[#111827]">
                                    <span>{formatDate(event.date)}</span>
                                    <span>|</span>
                                    <span>Rs. {event.price} per seat</span>
                                </div>

                                {/* Seats */}
                                <p className="mb-[13px] mt-[17px] text-[13px] font-bold text-[#047857]">
                                    Seats left: {event.totalSeats}
                                </p>

                                {/* Booking */}
                                <div className="flex items-center gap-[18px]">

                                    <label className="text-[12px] font-bold text-[#1e293b]">
                                        Seats
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={seats}
                                        onChange={(e) => setSeats(Number(e.target.value))}
                                        className="h-[28px] w-[84px] rounded-[4px] border border-[#94a3b8] bg-white px-[8px] text-[11px] outline-none"
                                    />

                                    <button
                                        onClick={async () => {
                                            if (!event) return;
                                            if (!seats || seats < 1) {
                                                toast.error("Please select a valid number of seats.");
                                                return;
                                            }
                                            if (seats > event.totalSeats) {
                                                toast.error(`Seats over! `);
                                                return;
                                            }
                                            try {
                                                const data = await createBooking(event._id, seats);

                                                const remainingSeats = data?.remainingSeats;

                                                if (typeof remainingSeats === "number") {
                                                    setEvent({ ...event, totalSeats: remainingSeats });
                                                } else {
                                                    setEvent({ ...event, totalSeats: event.totalSeats - seats });
                                                }

                                                toast.success("Booking successful!");

                                            } catch (err) {
                                                console.error("Booking failed:", err);

                                                const message =
                                                    err instanceof Error
                                                        ? err.message
                                                        : "Booking failed. Please try again.";

                                                toast.error(message);
                                            }
                                        }}
                                        className="h-[28px] w-[168px] rounded-[4px] bg-[#3454df] text-[12px] font-bold text-white hover:bg-blue-700"
                                    >
                                        Book Now
                                    </button>

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
