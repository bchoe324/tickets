"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { getMonth, getYear } from "date-fns";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateTicketAction(formData: FormData) {
  const ticketId = formData.get("ticketId");
  const dateString = formData.get("date");
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/ticket/${ticketId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("티켓 정보를 저장하지 못했습니다.");
  }
  if (typeof dateString !== "string") {
    throw new Error("Invalid date value provided.");
  }
  const date = new Date(dateString);
  const year = getYear(date);
  const month = getMonth(date) + 1;
  revalidateTag(`tickets-${year}-${month}`);
  redirect(`/tickets?year=${year}&month=${month}`);
}
