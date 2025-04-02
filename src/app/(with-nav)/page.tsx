import fetchRankData from "@/lib/fetch-rank-data";
import RankSlide from "@/components/rank-slide";
import Link from "next/link";
import NextIcon from "@/assets/icons/NextIcon";

export default async function Home() {
  const rankData = await fetchRankData();
  if (!rankData) return;
  const rankArray = rankData?.slice(0, 9);

  return (
    <>
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
