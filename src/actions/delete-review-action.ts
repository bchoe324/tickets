"use server";

import { getAccessToken } from "@/utils/get-access-token";

export default async function deleteReviewAction(reviewId: string) {
  const accessToken = await getAccessToken();

  try {
    const response: Response = await fetch(`/api/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    }
    console.log(response.status);
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    throw new Error(`${error}. 리뷰를 삭제 실패`);
  }
}
