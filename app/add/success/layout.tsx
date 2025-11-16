import { Suspense } from "react";

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
