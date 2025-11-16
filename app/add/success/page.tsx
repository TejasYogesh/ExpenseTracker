"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiEdit3, FiFolder, FiFileText } from "react-icons/fi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { div } from "framer-motion/client";

export default function SuccessPage() {
    const searchParams = useSearchParams();

    const amount = searchParams.get("amount") || "₹0";
    const note = searchParams.get("note") || "Expense logged";

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-md mx-auto pt-24 pb-16 px-6 text-center"
            >
                {/* UI continues the same */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl shadow-md">
                        <FiCheckCircle size={34} />
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-slate-800">
                    ₹{amount} logged!
                </h2>
                <h4 className="text-sm font-semibold text-slate-600 p-4">
                   NOTE:  {note}
                </h4>
                <p className="text-slate-500 text-sm mt-1">
                    Transaction Successfully Recorded
                </p>

                {/* (rest of your UI stays unchanged) */}
                <div className="m-8 rounded-2xl">
                    <Link href={"/dashboard"} className="p-4 bg-purple-500 text-white rounded-2xl"> Go to dashboard</Link>
                </div>

            </motion.div>


        </>
    );
}
