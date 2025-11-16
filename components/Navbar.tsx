"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPieChart, FiPlusCircle, FiActivity, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    const navItems = [
        { label: "Add Expense", href: "/add", icon: <FiPlusCircle size={20} /> },
        { label: "Dashboard", href: "/dashboard", icon: <FiPieChart size={20} /> },
    ];

    // ------------------------------
    // YOUTUBE - STYLE TOP LOADER LOGIC
    // ------------------------------
    useEffect(() => {
        // Start loader
        setVisible(true);
        setProgress(0);

        // Smooth YouTube-like sequence
        const timeout1 = setTimeout(() => setProgress(40), 150);
        const timeout2 = setTimeout(() => setProgress(80), 400);
        const timeout3 = setTimeout(() => setProgress(100), 650);

        // Fade out after reaching 100%
        const timeout4 = setTimeout(() => setVisible(false), 900);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
            clearTimeout(timeout4);
        };
    }, [pathname]);

    return (
        <>
            {/* TOP LOADER BAR */}
            {visible && (
                <div
                    style={{ width: `${progress}%` }}
                    className="fixed top-0 left-0 h-[3px] bg-purple-600 transition-all duration-300 z-60"
                />
            )}

            <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow text-white">
                            <FiActivity size={18} />
                        </div>
                        <span className="font-semibold text-slate-800 text-lg">ExpenseTracker</span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden md:flex items-center gap-4">
                        {navItems.map((item) => {
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${active
                                        ? "bg-purple-600 text-white shadow"
                                        : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="md:hidden text-slate-700"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>

                {/* MOBILE DROPDOWN MENU */}
                {mobileOpen && (
                    <div className="md:hidden bg-white shadow-inner border-t border-slate-200 px-5 py-3 space-y-3 animate-slideDown">
                        {navItems.map((item) => {
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${active
                                        ? "bg-purple-600 text-white shadow"
                                        : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </header>

            {/* Mobile dropdown animation */}
            <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
        </>
    );
}
