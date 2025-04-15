import DetailHeader from "@/components/detail-header";
import TicketFormFields from "@/components/ticket-form-fields";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <>
      <DetailHeader />
      <main>
        {id}
        <form action="">
          <TicketFormFields />
        </form>
      </main>
    </>
  );
}
