import { getAccessToken } from "@/utils/get-access-token";

export default async function fetchReviewData(
  endpoint?: "recent" | "myreview"
) {
  const accessToken = await getAccessToken();

  const url = `api/review/${!endpoint ? "" : endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
