"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

export default async function createTicketAction(formData: FormData) {
  const accessToken = await getAccessToken();

  const response = await fetch(`api/ticket/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("티켓 정보를 저장하지 못했습니다.");
  }
  redirect("/tickets");
}
