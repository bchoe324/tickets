"use client";

import deleteTicketAction from "@/actions/delete-ticket-action";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../common/loading";
import { swalConfirmOption } from "@/constants/ui";

export default function DeleteButton({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const result = await Swal.fire(swalConfirmOption);
    if (!result.isConfirmed) return;

    startTransition(async () => {
      try {
        await deleteTicketAction(ticketId);
        toast.success("삭제가 완료되었습니다.");
        router.push("/tickets");
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <>
      {isPending ? <Loading /> : null}
      <button onClick={handleDelete}>
        <DeleteIcon fill="#FF5252" />
        일정 삭제하기
      </button>
    </>
  );
}
