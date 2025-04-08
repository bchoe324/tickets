import { getYear, getMonth } from "date-fns";

export default async function Page() {
  const pivotDate = new Date();
  const year = getYear(pivotDate);
  const month = getMonth(pivotDate);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/ticket/monthly?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch ticket data");
  }
  const ticketData = await response.json();
  console.log(ticketData);
  return <div>tickets</div>;
}
