"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlusCircle, FiPieChart, FiActivity } from "react-icons/fi";

export default function Home() {
  return (
    <main className="pt-12 pb-20 px-6 max-w-5xl mx-auto">

      {/* ========= HERO SECTION ========= */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Smart Expense Tracker
        </h1>

        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          Track your daily spending, analyze category-wise patterns, and stay
          financially aware — all in a clean and simple interface.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/add"
            className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 shadow-md transition flex items-center gap-2"
          >
            <FiPlusCircle size={18} />
            Add Expense
          </Link>

          <Link
            href="/dashboard"
            className="border border-purple-500 text-purple-600 px-5 py-3 rounded-xl hover:bg-purple-50 shadow-sm transition flex items-center gap-2"
          >
            <FiPieChart size={18} />
            View Dashboard
          </Link>
        </div>
      </motion.div>

      {/* ========= FEATURES GRID ========= */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
            <FiPlusCircle />
          </div>
          <h3 className="font-semibold text-lg text-slate-800">Add Expenses Easily</h3>
          <p className="text-slate-600 text-sm mt-2">
            Quickly log your expenses with amount, category, notes, and location — all in a beautifully designed interface.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
            <FiPieChart />
          </div>
          <h3 className="font-semibold text-lg text-slate-800">Visual Dashboard</h3>
          <p className="text-slate-600 text-sm mt-2">
            Analyze category-wise spending, daily trends, and monthly patterns with interactive charts and insights.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
            <FiActivity />
          </div>
          <h3 className="font-semibold text-lg text-slate-800">Smart Insights</h3>
          <p className="text-slate-600 text-sm mt-2">
            Understand your habits with auto-generated summaries, expense streaks, and category optimization hints.
          </p>
        </motion.div>
      </section>

      {/* ========= CALL TO ACTION ========= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl font-semibold text-slate-800">
          Ready to take control of your spending?
        </h2>
        <Link
          href="/add"
          className="mt-6 inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition font-medium"
        >
          Add Your First Expense
        </Link>
      </motion.div>

    </main>
  );
}
