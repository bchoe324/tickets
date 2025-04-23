"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ShowSearchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!search || search === q) return;
    router.push(`/review/new/search?q=${search}`);
  };

  return (
    <div className="p-layout flex flex-col items-start">
      <h3 className="font-semibold mb-[15px]">공연 선택</h3>
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="공연명을 입력하세요."
        className="w-full p-[10px] border border-zinc-400 rounded-[8px] focus:outline-0 focus:border-primary-500"
      />
    </div>
  );
}
