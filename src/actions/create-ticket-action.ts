"use server";

import { getAccessToken } from "@/utils/get-access-token";
import { redirect } from "next/navigation";

export async function CreateTicketAction(formData: FormData) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/ticket/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("티켓 정보를 저장하지 못했습니다.");
  }
  redirect("/tickets");
}
