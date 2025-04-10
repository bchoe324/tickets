import { CreateTicketAction } from "@/actions/create-ticket-action";
import DetailHeader from "@/components/detail-header";
import TicketFormFields from "@/components/ticket-form-fields";

export default async function Page() {
  return (
    <>
      <DetailHeader
        centerChild={"새 일정 추가"}
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
          action={CreateTicketAction}
        >
          <TicketFormFields />
        </form>
      </main>
    </>
  );
}
