import fetchRankData from "@/lib/fetch-rank-data";
import RankSlide from "@/components/rank-slide";
import Link from "next/link";
import NextIcon from "@/assets/icons/NextIcon";
import { toast } from "sonner";

function ToastOnJoin({ joined }: { joined?: string }) {
  "use client";
  if (joined) {
    toast.success(
      "회원가입이 완료되었습니다. 가입한 이메일로 전송된 인증 링크를 확인해주세요."
    );
  }
  return null;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ joined?: string }>;
}) {
  const joined = await searchParams;
  const rankData = await fetchRankData();
  if (!rankData) return;
  const rankArray = rankData?.slice(0, 9);

  return (
    <>
      <ToastOnJoin joined={joined?.joined} />
      <section className="home-section pr-0">
        <div className="mb-layout flex justify-between items-center;">
          <h2>공연 순위</h2>
          <Link href={"/show"} className="flex-[0_0_auto] flex ">
            더보기{" "}
            <span className="w-[24px]">
              <NextIcon fill="currentColor" />
            </span>
          </Link>
        </div>
        <RankSlide rankArray={rankArray} />
      </section>
      <section className="home-section">
        <h2>공연 리뷰</h2>
      </section>
    </>
  );
}
