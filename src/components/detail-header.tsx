import { ReactNode } from "react";
import PrevIcon from "@/assets/icons/PrevIcon";

export default function DetailHeader({
  centerChild,
  rightChild,
}: {
  centerChild?: ReactNode;
  rightChild?: ReactNode;
}) {
  return (
    <header className="justify-between">
      <div className="flex-[1_1_20%] flex items-center">
        <button className="block h-full">
          <div className="w-auto h-[32px] hover:*:opacity-80 active:*:opacity-80">
            <PrevIcon fill="currentColor" />
          </div>
        </button>
      </div>
      <div className="flex-[1_1_60%] flex justify-center items-center">
        {centerChild ? (
          <h2 className="text-h2 font-semibold">{centerChild}</h2>
        ) : null}
      </div>
      <div className="flex-[1_1_20%] w-2 flex justify-end items-center">
        {rightChild ? rightChild : null}
      </div>
    </header>
  );
}
