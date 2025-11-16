export interface Expense {
  id: string;
  amount: number;
  tag: string;
  note?: string | null;            // ✅ FIXED HERE
  location_lat?: number | null;
  location_lng?: number | null;
  created_at: string;
}


export interface DashboardData {
  expenses: Expense[];
  summary: Record<string, number>;
  dailyTotals: Record<string, number>;
  monthlyTotals: Record<string, number>;
}
