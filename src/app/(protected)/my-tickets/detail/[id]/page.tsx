import DetailHeader from "@/components/common/detail-header";
import { format } from "date-fns";
import Image from "next/image";
import ActionMenu from "@/components/common/action-menu";
import EditIcon from "@/assets/icons/EditIcon";
import Link from "next/link";
import DeleteButton from "@/components/ticket/delete-button";
import { getAccessToken } from "@/utils/get-access-token";

async function TicketDetail({ ticketId }: { ticketId: string }) {
  const accessToken = await getAccessToken();

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
  const ticketData = await response.json();

  return (
    <div className="ticket-form-layout">
      <div className="row image">
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/tickets-images/${ticketData.imageUrl}`}
          width={600}
          height={1200}
          alt={`${ticketData.title} 대표 이미지`}
        />
      </div>
      <div className="row title">
        <h2>{ticketData.title}</h2>
      </div>
      <div className="row">
        <div className="label">날짜</div>
        <div className="text">
          {format(ticketData.date, "yyyy년 MM월 dd일 HH시 mm분")}
        </div>
      </div>
      <div className="row">
        <div className="label">캐스트</div>
        <div className="text">{ticketData.cast}</div>
      </div>
      <div className="row">
        <div className="label">극장</div>
        <div className="text">{ticketData.theater}</div>
      </div>
      <div className="row">
        <div className="label">좌석</div>
        <div className="text">{ticketData.seat}</div>
      </div>
      <div className="row">
        <div className="label">금액</div>
        <div className="text">{ticketData.price}</div>
      </div>
      <div className="row">
        <div className="label">예매처</div>
        <div className="text">{ticketData.site}</div>
      </div>
      <div className="row review">
        <div className="label">리뷰</div>
        <div className="text">{ticketData.review}</div>
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <>
      <DetailHeader
        rightChild={
          <ActionMenu
            items={[
              {
                element: (
                  <Link href={`/my-tickets/edit/${id}`}>
                    <EditIcon fill="#333" />
                    일정 수정하기
                  </Link>
                ),
              },
              {
                element: <DeleteButton ticketId={id} />,
              },
            ]}
          />
        }
      />
      <main>
        <TicketDetail ticketId={id} />
      </main>
    </>
  );
}
