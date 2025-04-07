"use client";

import ProfileCard from "@/components/profile-card";
import { logout } from "@/lib/supabase/logout";

export default function Page() {
  return (
    <>
      <ProfileCard />
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
