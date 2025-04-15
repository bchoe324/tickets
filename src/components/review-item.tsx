"use client";

import { ReviewData } from "@/types";
import ThumbUpIcon from "@/assets/icons/ThumbUpIcon";
import ThumbDownIcon from "@/assets/icons/ThumbDownIcon";
import ToggleText from "@/components/toggle-text";
import getRelativeTime from "@/utils/get-relative-time";
import Image from "next/image";

export default function ReviewItem({ review }: { review: ReviewData }) {
  const now = new Date().getTime();

  return (
    <>
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
