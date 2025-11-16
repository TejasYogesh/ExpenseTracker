"use client";

import { FiShoppingCart, FiCoffee, FiTruck, FiZap, FiFilm, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Expense } from "@/types/expense"; 


 // ensure same type used everywhere

interface ExpenseCardProps {
  expense: Expense;
}

export default function ExpenseCard({ expense }: { expense: Expense }) {
  const icons: Record<string, ReactNode> = {
    Groceries: <FiShoppingCart />,
    Dining: <FiCoffee />,
    Travel: <FiTruck />, // FIXED: FiCar → FiTruck
    Utilities: <FiZap />,
    Entertainment: <FiFilm />,
  };

  const icon = icons[expense.tag] || <FiTag />;

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.15 }}
      className="w-full bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md p-4 flex justify-between items-center"
    >
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
    </motion.div>
  );
}
