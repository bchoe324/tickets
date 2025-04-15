import { getAccessToken } from "@/utils/get-access-token";

export default async function FetchReviewData(
  endpoint?: "recent" | "myreview"
) {
  const accessToken = await getAccessToken();

  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${
    !endpoint ? "" : endpoint
  }`;

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
