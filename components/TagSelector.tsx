"use client";

interface TagSelectorProps {
  selected: string;
  onSelect: (tag: string) => void;
}

const tags = [
  "Dining",
  "Groceries",
  "Travel",
  "Utilities",
  "Entertainment",
  "Other"
];

export default function TagSelector({ selected, onSelect }: TagSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={`px-4 py-2 rounded-full border ${
            selected === t ? "bg-purple-600 text-white" : "bg-white"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
