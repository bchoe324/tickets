import NavList from "@/components/nav-list";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="justify-center">
        <h1 className="text-[20px]">Tickets</h1>
      </header>
      <NavList />
      <main>{children}</main>
      <Toaster position="top-center" />
    </>
  );
}
