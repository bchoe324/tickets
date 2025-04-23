"use client";

import { ReviewData } from "@/types";
import ThumbUpIcon from "@/assets/icons/ThumbUpIcon";
import ThumbDownIcon from "@/assets/icons/ThumbDownIcon";
import ToggleText from "@/components/common/toggle-text";
import getRelativeTime from "@/utils/get-relative-time";
import Image from "next/image";
import ActionMenu from "../common/action-menu";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import deleteReviewAction from "@/actions/delete-review-action";
import { useTransition } from "react";
import { toast } from "sonner";
import Loading from "../common/loading";
import { swalConfirmOption } from "@/constants/ui";

export default function ReviewItem({
  review,
  isMenuVisible,
}: {
  review: ReviewData;
  isMenuVisible: boolean;
}) {
  const now = new Date().getTime();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickDelete = async () => {
    const result = await Swal.fire(swalConfirmOption);
    if (!result.isConfirmed) return;
    startTransition(async () => {
      try {
        await deleteReviewAction(review.id);
        toast.success("삭제가 완료되었습니다.");
        router.push("/review/my-review");
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      {isPending ? <Loading /> : null}
      {isMenuVisible ? (
        <ActionMenu
          items={[
            {
              element: (
                <span>
                  <EditIcon fill="#333" />
                  리뷰 수정하기
                </span>
              ),
              onClick: () => router.push(`/review/edit/${review.id}`),
            },
            {
              element: (
                <span className="delete_button">
                  <DeleteIcon fill="#FF5252" /> 리뷰 삭제하기
                </span>
              ),
              onClick: () => handleClickDelete(),
            },
          ]}
        />
      ) : null}
      <div className="poster">
        <Image
          src={review.show.poster}
          width={150}
          height={180}
          alt={`${review.show.title} 포스터`}
        />
        {review.recommend ? (
          <span className="icon like">
            <ThumbUpIcon fill="#fff" />
          </span>
        ) : (
          <span className="icon dislike">
            <ThumbDownIcon fill="#fff" />
          </span>
        )}
      </div>
      <div className="text">
        <p className="title">{review.show.title}</p>
        <ToggleText text={review.review} maxLength={100} />
      </div>
      <p className="created_time">{getRelativeTime(review.createdAt, now)}</p>
    </>
  );
}
