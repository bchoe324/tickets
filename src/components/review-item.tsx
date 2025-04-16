"use client";

import { ReviewData } from "@/types";
import ThumbUpIcon from "@/assets/icons/ThumbUpIcon";
import ThumbDownIcon from "@/assets/icons/ThumbDownIcon";
import ToggleText from "@/components/toggle-text";
import getRelativeTime from "@/utils/get-relative-time";
import Image from "next/image";
import ActionMenu from "./action-menu";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useRouter } from "next/navigation";

export default function ReviewItem({
  review,
  isMenuVisible,
}: {
  review: ReviewData;
  isMenuVisible: boolean;
}) {
  const now = new Date().getTime();
  const router = useRouter();

  return (
    <>
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
              onClick: () => {},
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
