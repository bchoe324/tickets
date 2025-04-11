import DetailHeader from "@/components/detail-header";
import TicketFormFields from "@/components/ticket-form-fields";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <DetailHeader />
      <main>
        <form action="">
          <TicketFormFields />
        </form>
      </main>
    </>
  );
}
