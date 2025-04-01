"use client";

import Link from "next/link";
import TicketIcon from "@/assets/icons/TicketIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/tickets",
    icon: <TicketIcon fill="currentColor" />,
    text: "티켓",
  },
  {
    href: "/",
    icon: <HomeIcon fill="currentColor" />,
    text: "홈",
  },
  {
    href: "/mypage",
    icon: <ProfileIcon fill="currentColor" />,
    text: "마이페이지",
  },
];

export default function NavList() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="bg-black text-white w-full max-w-width-max min-w-width-min h-nav-height p-[15px] fixed bottom-0 left-[50%] transform translate-x-[-50%] z-10">
      <ul className="flex justify-between">
        {navItems.map((item) => (
          <li key={item.text}>
            <Link
              href={item.href}
              className={`w-[80px] flex flex-col justify-center items-center ${
                pathname === item.href ? "text-white" : "text-zinc-300"
              }`}
            >
              <span className="h-[24px] *:h-full">{item.icon}</span>
              <span className="text-[12px] mt-[5px]">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
