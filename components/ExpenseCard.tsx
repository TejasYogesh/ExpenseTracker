"use client";

import { useState, useRef, type ReactNode } from "react";
import { FiShoppingCart, FiCoffee, FiTruck, FiZap, FiFilm, FiTag, FiPlay, FiPause } from "react-icons/fi";
import { motion } from "framer-motion";
import { Expense } from "@/types/expense";

export default function ExpenseCard({ expense }: { expense: Expense }) {
  const icons: Record<string, ReactNode> = {
    Groceries: <FiShoppingCart />,
    Dining: <FiCoffee />,
    Travel: <FiTruck />,
    Utilities: <FiZap />,
    Entertainment: <FiFilm />,
  };

  const icon = icons[expense.tag] || <FiTag />;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }

    audioRef.current.onended = () => setPlaying(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.15 }}
      className="w-full bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md p-4 space-y-3"
    >
      {/* TOP SECTION */}
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shadow-sm">
            {icon}
          </div>

          <div>
            <div className="font-semibold text-lg text-slate-800">₹{expense.amount}</div>
            <div className="text-sm text-slate-500">
              {expense.tag} • {expense.note || "No note"}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {new Date(expense.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* AUDIO PLAYER (ONLY IF EXISTS) */}
      {expense.voice_note_url && (
        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow hover:bg-purple-700 transition"
          >
            {playing ? <FiPause size={18} /> : <FiPlay size={18} />}
          </button>

          <div className="flex-1 text-sm text-purple-700">
            Voice Note Attached
          </div>

          <audio ref={audioRef} src={expense.voice_note_url} preload="auto" />
        </div>
      )}
    </motion.div>
  );
}
