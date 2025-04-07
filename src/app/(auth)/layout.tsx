import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-layout">
      <div className="title">
        <h1>Tickets</h1>
      </div>
      {children}
    </div>
  );
}
