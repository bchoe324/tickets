"use server";

import { getAccessToken } from "@/utils/get-access-token";

export default async function deleteTicketAction(ticketId: string) {
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(`api/ticket/${ticketId}`, {
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
    console.error("티켓 삭제 실패:", error);
    throw new Error(`${error}. 티켓를 삭제 실패`);
  }
}
