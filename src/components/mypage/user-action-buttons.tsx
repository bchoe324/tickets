"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import Loading from "../common/loading";
import logoutAction from "@/actions/logout-action";
import { useRouter } from "next/navigation";

export default function UserActionButtons() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        logoutAction();
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleLeave = () => {
    toast.info("👩‍💻 준비 중인 기능입니다.");
  };

  return (
    <>
      {isPending ? <Loading /> : null}
      <div className="py-[10px] px-layout mt-[10px] flex-center *:text-zinc-400">
        <button onClick={handleLogout}>로그아웃</button>
        <span className="w-px h-[16px] bg-zinc-400 mx-[10px]"></span>
        <button onClick={handleLeave}>회원 탈퇴</button>
      </div>
    </>
  );
}
