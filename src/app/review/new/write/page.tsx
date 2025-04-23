import createReviewAction from "@/actions/create-review-action";
import DetailHeader from "@/components/common/detail-header";
import ReviewFormFields from "@/components/review/review-form-fields";
import { XMLParser } from "fast-xml-parser";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ showId: string }>;
}) {
  const showId = (await searchParams).showId;
  const url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${showId}?service=${process.env.KOPIS_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) return;

  const xmlText = await response.text();

  const parser = new XMLParser();
  const jsonResult = parser.parse(xmlText);
  const {
    prfnm: title,
    poster: poster,
    prfpdfrom: startDate,
    prfpdto: endDate,
    fcltynm: theater,
  } = await jsonResult.dbs.db;

  const showDataJson = JSON.stringify({
    id: showId,
    title,
    poster,
    startDate,
    endDate,
    theater,
  });

  return (
    <>
      <DetailHeader
        centerChild={"관람 후기 작성"}
        rightChild={
          <button type="submit" form="review">
            등록
          </button>
        }
      />
      <main>
        <div className="p-layout mt-layout">
          <div>
            <p className="font-bold mb-[15px]">관람 공연</p>
            <div className="flex p-[10px] border border-primary-400 rounded-[8px]">
              <Image
                src={poster}
                width={60}
                height={80}
                alt={`${title} 포스터`}
                className="flex-fixed w-14"
              />
              <div className="ml-layout flex-auto *:nth-[n+2]:mt-[5px] *:text-[14px] ">
                <p className="text-[16px] font-bold">{title}</p>
                <p className="duration">{`${startDate} ~ ${endDate}`}</p>
                <p className="theater">{theater}</p>
              </div>
            </div>
          </div>
          <form
            id="review"
            action={createReviewAction}
            className="review-form-layout"
          >
            <input
              type="text"
              name="show"
              value={showDataJson}
              hidden
              readOnly
            />
            <ReviewFormFields />
          </form>
        </div>
      </main>
    </>
  );
}
