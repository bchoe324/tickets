import fetchRankData from "@/lib/fetch-rank-data";
import DetailHeader from "@/components/common/detail-header";
import Image from "next/image";
import { format, subDays } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import ShowItemSkeleton from "@/components/skeleton/show-item-skeleton";

async function ShowList() {
  const rankData = await fetchRankData();

  return (
    <>
      {rankData?.map((item) => (
        <Link
          key={item.rnum}
          className="show-list-layout"
          href={`/show/detail/${item.mt20id}`}
        >
          <div className="poster">
            <span className="w-[24px] h-[24px] flex items-center justify-center bg-black text-white text-[12px] absolute inset-0 rounded-tl-[4px]">
              {item.rnum}
            </span>
            <Image
              src={item.poster}
              width={300}
              height={400}
              alt={`${item.prfnm}의 포스터 이미지`}
            />
          </div>
          <div className="info">
            <p className="title">{item.prfnm}</p>
            <p>{item.prfplcnm}</p>
            <p>{item.prfpd}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default async function Page() {
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const weekBefore = format(subDays(new Date(), 7), "yyyy년 MM월 dd일");

  return (
    <>
      <DetailHeader centerChild={"이번 주 공연 순위"} />
      <main>
        <Suspense fallback={<ShowItemSkeleton count={5} />}>
          <ShowList />
        </Suspense>
        <p className="mt-layout ml-layout">
          {`※ 집계 기간: ${weekBefore} ~ ${today}`} <br /> ※ 출처:
          (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
        </p>
      </main>
    </>
  );
}
