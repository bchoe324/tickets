import createTicketAction from "@/actions/create-ticket-action";
import DetailHeader from "@/components/common/detail-header";
import TicketFormFields from "@/components/ticket/ticket-form-fields";

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
          action={createTicketAction}
        >
          <TicketFormFields />
        </form>
      </main>
    </>
  );
}
