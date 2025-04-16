"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

export default async function createReviewAction(formData: FormData) {
  const accessToken = await getAccessToken();

  const showId = formData.get("showId");
  const title = formData.get("title");
  const poster = formData.get("poster");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const theater = formData.get("theater");
  const recommend = Number(formData.get("recommend"));
  const review = formData.get("review");

  console.log(
    showId,
    title,
    poster,
    recommend,
    review,
    startDate,
    endDate,
    theater
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          show: {
            id: showId,
            title,
            poster,
            startDate,
            endDate,
            theater,
          },
          recommend,
          review,
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
    redirect("/");
  }
}
