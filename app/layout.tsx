import "./globals.css";
import Navbar from "../components/Navbar";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your spending",
};

// Load Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">
        <Navbar />
        <main className="pt-20 px-5 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
