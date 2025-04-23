import InfoIcon from "@/assets/icons/InfoIcon";
import DetailHeader from "@/components/common/detail-header";
import ShowSearchbar from "@/components/show/show-searchbar";
import fetchSearchShowResult from "@/lib/fetch-search-show-result";
import { RawShow } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function SearchResult({ q }: { q: string }) {
  const result: RawShow[] = await fetchSearchShowResult(q);

  return (
    <div className="px-layout">
      {result.length > 0 ? (
        <div className="flex flex-col">
          <p className="mb-[15px] text-zinc-500 flex-start [&_svg]:w-[16px] [&_svg]:mr-[5px]">
            <InfoIcon fill="currentColor" /> 공연을 선택해 주세요.
          </p>
          {result.map((item) => (
            <Link
              key={item.mt20id}
              href={`/review/new/write?showId=${item.mt20id}`}
              className="relative flex-auto w-full p-[10px] rounded-[8px] flex-start hover:bg-black/5 active:bg-primary-300/70"
            >
              <Image
                src={item.poster}
                width={60}
                height={80}
                alt={`${item.prfnm} 포스터`}
                className="flex-fixed"
              />
              <div className="ml-layout flex-auto *:nth-[n+2]:mt-[5px] text-[14px]">
                <p className="text-[16px] font-bold">{item.prfnm}</p>
                <p>
                  {item.prfpdfrom} ~ {item.prfpdto}
                </p>
                <p>{item.fcltynm}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q;

  return (
    <>
      <DetailHeader centerChild={"관람 후기 작성"} />
      <main>
        <ShowSearchbar />
        {q ? <SearchResult q={q} /> : null}
      </main>
    </>
  );
}
