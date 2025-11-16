import { createServerSupabase } from "@/lib/supabase-server";
import DashboardClient from "./DashboardClient";

async function getData() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("expensesfinal")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { expenses: [], summary: {}, dailyTotals: {}, monthlyTotals: {} };
  }

  const summary: Record<string, number> = {};
  const dailyTotals: Record<string, number> = {};
  const monthlyTotals: Record<string, number> = {};

  data.forEach((e: { created_at: string; tag: string; amount: string | number }) => {
    const d = new Date(e.created_at);
    const day = d.toLocaleDateString();
    const month = d.toLocaleString("default", { month: "short", year: "numeric" });

    summary[e.tag] = (summary[e.tag] || 0) + Number(e.amount);
    dailyTotals[day] = (dailyTotals[day] || 0) + Number(e.amount);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(e.amount);
  });

  return { expenses: data, summary, dailyTotals, monthlyTotals };
}

export default async function DashboardPage() {
  const data = await getData();
  return <DashboardClient {...data} />;
}
