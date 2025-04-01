import fetchRankData from "@/lib/fetch-rank-data";
import DetailHeader from "@/components/detail-header";
import Image from "next/image";
import { format, subDays } from "date-fns";

export default async function Page() {
  const rankData = await fetchRankData();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const weekBefore = format(subDays(new Date(), 7), "yyyy년 MM월 dd일");

  return (
    <>
      <DetailHeader centerChild={"이번 주 공연 순위"} />
      <main>
        {rankData?.map((item) => (
          <div
            key={item.rnum}
            className="flex p-[25px] border-b border-zinc-300 cursor-pointer"
          >
            <div className="list-poster">
              <span>{item.rnum}</span>
              <Image
                src={item.poster}
                width={300}
                height={400}
                alt={`${item.prfnm}의 포스터 이미지`}
              />
            </div>
            <div>
              <p>{item.prfnm}</p>
              <p>{item.prfplcnm}</p>
              <p>{item.prfpd}</p>
            </div>
          </div>
        ))}
        <p className="notice">
          {`※ 집계 기간: ${weekBefore} ~ ${today}`} <br /> ※ 출처:
          (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
        </p>
      </main>
    </>
  );
}
