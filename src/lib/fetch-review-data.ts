import { getAccessToken } from "@/utils/get-access-token";

export default async function fetchReviewData(
  endpoint?: "recent" | "myreview"
) {
  const accessToken = await getAccessToken();

  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${
    !endpoint ? "" : endpoint
  }`;
  console.log(accessToken, url);

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
