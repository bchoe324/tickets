import { getAccessToken } from "@/utils/get-access-token";

import DetailHeader from "@/components/common/detail-header";
import Image from "next/image";
import ReviewFormFields from "@/components/review/review-form-fields";
import { ReviewData } from "@/types";
import updateReviewAction from "@/actions/update-review-action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const accessToken = await getAccessToken();
  let review: ReviewData | null = null;
  try {
    const response = await fetch(`api/review/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    review = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <DetailHeader
        centerChild={"관람 후기 수정"}
        rightChild={
          <button type="submit" form="edit-revivew">
            저장
          </button>
        }
      />
      <main>
        {review ? (
          <div className="p-layout mt-layout">
            <div>
              <p className="font-bold mb-[15px]">관람 공연</p>
              <div className="flex p-[10px] border border-primary-400 rounded-[8px]">
                <Image
                  src={review.show.poster}
                  width={60}
                  height={80}
                  alt={`${review.show.title} 포스터`}
                  className="flex-fixed w-14"
                />
                <div className="ml-layout flex-auto *:nth-[n+2]:mt-[5px] *:text-[14px] ">
                  <p className="text-[16px] font-bold">{review.show.title}</p>
                  <p className="duration">{`${review.show.startDate} ~ ${review.show.endDate}`}</p>
                  <p className="theater">{review.show.theater}</p>
                </div>
              </div>
            </div>
            <form
              id="edit-revivew"
              action={updateReviewAction}
              className="review-form-layout"
            >
              <input type="text" name="reviewId" value={id} hidden readOnly />
              <ReviewFormFields review={review} />
            </form>
          </div>
        ) : (
          <p>후기 정보를 불러오지 못했습니다.</p>
        )}
      </main>
    </>
  );
}
