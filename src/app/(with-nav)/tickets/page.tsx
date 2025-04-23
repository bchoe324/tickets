import Calendar from "@/components/ticket/calendar";
import { getAccessToken } from "@/utils/get-access-token";
import { getYear, getMonth } from "date-fns";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const now = new Date();
  const searchYear = (await searchParams).year;
  const searchMonth = (await searchParams).month;
  const year = Number(searchYear) || getYear(now);
  const month = Number(searchMonth) || getMonth(now);
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/ticket/monthly?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch ticket data");
  }
  const tickets = await response.json();
  return (
    <>
      <div className="tickets-calendar">
        <Calendar pivotDate={new Date(year, month)} tickets={tickets} />
      </div>
    </>
  );
}
