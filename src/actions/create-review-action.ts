"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

export default async function createReviewAction(formData: FormData) {
  const rawShow = formData.get("show");
  const show = typeof rawShow === "string" ? JSON.parse(rawShow) : null;
  if (!show) return;

  const recommend = Number(formData.get("recommend"));
  const review = formData.get("review");
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          show,
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
