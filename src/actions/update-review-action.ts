"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

type updateReviewType = {
  recommend: number;
  review: string;
};

export default async function updateReviewAction(formData: FormData) {
  const accessToken = await getAccessToken();

  const reviewId = formData.get("reviewId");
  const rawBefore = formData.get("beforeData");
  const before: updateReviewType =
    typeof rawBefore === "string" ? JSON.parse(rawBefore) : null;
  if (!before) return;

  const rawRecommend = formData.get("recommend");
  const recommend = rawRecommend !== null ? Number(rawRecommend) : null;
  const review = formData.get("review") as string;

  const newData: Partial<updateReviewType> = {};

  if (recommend !== null && before.recommend !== recommend) {
    newData.recommend = recommend;
  }
  if (before.review !== review) newData.review = review;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newData,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    }
    console.log(response.status);
  } catch (error) {
    console.error("리뷰 저장 실패:", error);
    throw new Error(`${error}. 리뷰 정보를 저장하지 못했습니다.`);
  } finally {
    redirect("/review/my-review");
  }
}
