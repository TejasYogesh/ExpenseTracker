"use client";

import { motion } from "framer-motion";
import ExpenseCard from "../../components/ExpenseCard";
import { CategoryPieChart, DailyLineChart, MonthlyBarChart } from "../../components/Charts";
import { FiTrendingUp, FiPieChart, FiBarChart2 } from "react-icons/fi";
import DownloadExcel from "../../components/DownloadExcel";
import { DashboardData, Expense } from "@/types/expense";

type DashboardClientProps = DashboardData


export default function DashboardClient({
  expenses,
  summary,
  dailyTotals,
  monthlyTotals,
}: DashboardClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto mt-8 space-y-12 pb-20"
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-start gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiTrendingUp size={24} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Dashboard Overview
          </h2>
        </div>

        <p className="text-slate-500 text-sm">
          Track your daily, monthly & category-wise spending insights.
        </p>

        <div className="pt-4">
          <DownloadExcel expenses={expenses} />
        </div>
      </motion.div>

      {/* ================= CHARTS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Pie Chart */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-3">
            <FiPieChart className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">
              Category Breakdown
            </h3>
          </div>

          <CategoryPieChart data={summary} />
        </div>

        {/* Monthly Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-3">
            <FiBarChart2 className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">
              Monthly Trend
            </h3>
          </div>

          <MonthlyBarChart data={monthlyTotals} />
        </div>
      </motion.div>

      {/* ================= DAILY LINE CHART ================= */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Daily Spending
        </h3>
        <DailyLineChart data={dailyTotals} />
      </motion.div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-slate-800">
          Recent Transactions
        </h3>

        {expenses.length === 0 ? (
          <div className="text-sm text-slate-500">No transactions yet</div>
        ) : (
          expenses.slice(0, 10).map((e: Expense) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ExpenseCard expense={e} />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
