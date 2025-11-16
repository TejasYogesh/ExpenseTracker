"use client";

import { useEffect, useState } from "react";
import TagSelector from "../../components/TagSelector";
import { supabase } from "@/lib/supabase";
import { FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AddPage() {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [tag, setTag] = useState("");
    const [location, setLocation] = useState({ lat: null as number | null, lng: null as number | null });

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) =>
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        );
    }, []);

    async function submit() {
        if (!amount || !tag) {
            alert("Amount and tag are required");
            return;
        }

        const payload = {
            amount: Number(amount),
            note: note || null,
            tag,
            location_lat: location.lat ?? null,
            location_lng: location.lng ?? null,
        };

        const { error } = await supabase.from("expensesfinal").insert(payload);

        if (error) {
            alert(error.message);
            return;
        }

        // Redirect to SUCCESS PAGE
        window.location.href = `/add/success?amount=${amount}&note=${note}`;
    }


    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-xl mx-auto"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <FiPlusCircle size={24} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Add Expense</h1>
                </div>

                {/* Card */}
                <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6  space-y-6">

                    {/* Amount Field */}
                    <div>
                        <label className="text-sm font-medium text-slate-600">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="mt-1 border border-slate-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Note Field */}
                    <div>
                        <label className="text-sm font-medium text-slate-600">Note</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Enter description"
                            className="mt-1 border border-slate-300 rounded-lg w-full p-3 min-h-[90px] resize-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Tag Selector */}
                    <div>
                        <label className="text-sm font-medium text-slate-600">Tag this Spend</label>
                        <div className="mt-2">
                            <TagSelector selected={tag} onSelect={setTag} />
                        </div>
                    </div>

                    {/* Location preview */}
                    <div className="bg-purple-50 text-purple-700 text-xs p-2 rounded-md border border-purple-200">
                        Location Auto-Captured:{" "}
                        {location.lat ? (
                            <span>
                                {location.lat.toFixed(4)}, {location.lng?.toFixed(4)}
                            </span>
                        ) : (
                            "Detecting..."
                        )}
                    </div>

                    {/* Button */}
                    <button
                        onClick={submit}
                        className="bg-purple-600 hover:bg-purple-700 transition text-white p-3 rounded-lg w-full text-lg font-medium shadow-md"
                    >
                        Add Expense
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
