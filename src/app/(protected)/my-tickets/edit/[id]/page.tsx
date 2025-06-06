import updateTicketAction from "@/actions/update-ticket-action";
import DetailHeader from "@/components/common/detail-header";
import TicketFormFields from "@/components/ticket/ticket-form-fields";
import { getAccessToken } from "@/utils/get-access-token";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const accessToken = await getAccessToken();
  const ticketId = (await params).id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/ticket/${ticketId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response) throw new Error("Failed to fetch ticket data");
  const ticket = await response.json();

  return (
    <>
      <DetailHeader
        rightChild={
          <button type="submit" form="ticket">
            저장
          </button>
        }
      />
      <main>
        <form
          id="ticket"
          encType="multipart/form-data"
          action={updateTicketAction}
        >
          <TicketFormFields ticket={ticket} />
        </form>
      </main>
    </>
  );
}
