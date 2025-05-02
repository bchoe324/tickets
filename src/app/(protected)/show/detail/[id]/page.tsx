import { XMLParser } from "fast-xml-parser";
import DetailHeader from "@/components/common/detail-header";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${id}?service=${process.env.KOPIS_API_KEY}`;
  const response = await fetch(url, {
    cache: "force-cache",
  });
  if (!response.ok) return;
  const xmlText = await response.text();

  const parser = new XMLParser();
  const jsonResult = parser.parse(xmlText);

  const showData = jsonResult.dbs.db;

  return (
    <>
      <DetailHeader centerChild={"공연 상세 정보"} />
      <main>
        <div className="flex mx-layout mt-layout mb-[40px]">
          <div className="w-30 mr-layout">
            <Image
              className="w-full h-full object-contain"
              src={showData.poster}
              width={300}
              height={400}
              alt={`${showData.prfnm}의 포스터 이미지`}
            />
          </div>
          <div className="flex-auto">
            <div className="flex justify-start items-center">
              <h3 className="text-[18px] font-semibold">{showData.prfnm}</h3>
              <span className="ml-[10px] text-[12px] text-primary-500 border border-primary-500 rounded-[20px] py-[3px] px-[8px]">
                {showData.prfstate}
              </span>
            </div>
            <div className="*:mt-[10px] *:flex *:items-center *:text-[15px] [&_dt]:text-zinc-500 [&_dt]:w-20 [&_dd]:flex-auto">
              <dl className="">
                <dt className="">개요</dt>
                <dd>
                  {showData.genrenm} | {showData.prfage}
                </dd>
              </dl>
              <dl className="">
                <dt className="">기간</dt>
                <dd>
                  {showData.prfpdfrom} ~ {showData.prfpdto}
                </dd>
              </dl>
              <dl className="">
                <dt className="">공연장</dt>
                <dd>{showData.fcltynm}</dd>
              </dl>
              <dl className="">
                <dt className="">관람시간</dt>
                <dd>{showData.prfruntime}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="mx-layout mb-[40px] *:text-[15px] *:nth-[n+2]:mt-[10px] [&_dt]:text-zinc-500">
          <dl className="">
            <dt className="">출연진</dt>
            <dd>{showData.prfcast}</dd>
          </dl>
          <dl className="">
            <dt className="">가격정보</dt>
            <dd>{showData.pcseguidance}</dd>
          </dl>
        </div>
        <div className="">
          <Image
            src={
              Array.isArray(showData?.styurls)
                ? showData.styurls[0]?.styurl
                : showData?.styurls?.styurl ?? ""
            }
            width={600}
            height={1000}
            alt={`${showData.prfnm}의 공연 상세 정보 이미지`}
          />
        </div>
      </main>
    </>
  );
}
