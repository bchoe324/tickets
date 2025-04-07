"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function ProfileCard() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("session", session);
    });
  }, []);

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/user`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // if (!response.ok) {
  //   console.error("유저 정보 조회 실패:", response.status);
  //   return <div>유저 정보 조회 실패</div>;
  // }
  // const user = await response.json();
  // console.log(user);
  return <div></div>;
}
