"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

export async function createReviewAction(formData: FormData) {
  const accessToken = await getAccessToken();

  const showId = formData.get("showId");
  const recommend = formData.get("recommend");
  const review = formData.get("review");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ showId, recommend, review }),
    }
  );
  if (!response.ok) {
    throw new Error("리뷰 정보를 저장하지 못했습니다.");
  }
  redirect("/");
}
