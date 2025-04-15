import { ReactNode } from "react";

export default function FloatingButton({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-layout -translate-x-[calc(100%+20px)] w-15 h-15 rounded-[50%] bg-primary-400 text-white">
      {children}
    </div>
  );
}
