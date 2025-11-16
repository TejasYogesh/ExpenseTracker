"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

import { motion } from "framer-motion";

const COLORS = [
  "#7c3aed",
  "#8b5cf6",
  "#a78bfa",
  "#c084fc",
  "#7dd3fc",
  "#f472b6",
];

/* ------------------------------------------------------
   CATEGORY PIE CHART (PieChart)
------------------------------------------------------ */
export function CategoryPieChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).map(([name, value]) => ({ name, value }));
  if (!entries.length) return <div>No data to display</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={entries}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={6}
          >
            {entries.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ------------------------------------------------------
   DAILY LINE CHART (LineChart)
------------------------------------------------------ */
export function DailyLineChart({ data }: { data: Record<string, number> }) {
  const series = Object.entries(data).map(([date, value]) => ({ date, value }));
  if (!series.length) return <div>No data to display</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ------------------------------------------------------
   MONTHLY BAR CHART (BarChart)
------------------------------------------------------ */
export function MonthlyBarChart({ data }: { data: Record<string, number> }) {
  const series = Object.entries(data).map(([label, value]) => ({ label, value }));
  if (!series.length) return <div>No data to display</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
