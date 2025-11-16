"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Expense } from "@/types/expense"; 


 // ensure same type used everywhere

interface ExpenseCardProps {
  expense: Expense;
}

export default function DownloadExcel({ expenses }: { expenses: Expense[] }) {

  function downloadExcel() {
    if (!expenses || expenses.length === 0) {
      alert("No expenses to download");
      return;
    }

    // Convert expenses into worksheet rows
    const formatted = expenses.map((e) => ({
      Amount: e.amount,
      Tag: e.tag,
      Note: e.note || "",
      "Latitude": e.location_lat || "",
      "Longitude": e.location_lng || "",
      "Date": new Date(e.created_at).toLocaleString(),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file to user's device
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Expenses_${new Date().toLocaleDateString()}.xlsx`);
  }

  return (
    <button
      onClick={downloadExcel}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition"
    >
      Download as Excel
    </button>
  );
}
