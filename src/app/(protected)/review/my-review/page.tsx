import DetailHeader from "@/components/common/detail-header";
import FloatingButton from "@/components/review/floating-button";
import NoContent from "@/components/common/no-contents";
import ReviewItem from "@/components/review/review-item";
import fetchReviewData from "@/lib/fetch-review-data";
import { ReviewData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";
import { Suspense } from "react";
import ReviewItemSkeleton from "@/components/skeleton/review-item-skeleton";

async function ReviewList() {
  const reviews: ReviewData[] = await fetchReviewData("myreview");
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review-item-layout" key={review.createdAt}>
            <ReviewItem review={review} isMenuVisible={true} />
          </div>
        ))
      ) : (
        <NoContent>
          <p>작성한 관람 후기가 없어요.</p>
        </NoContent>
      )}
    </>
  );
}

export default async function Page() {
  return (
    <>
      <DetailHeader centerChild={"내 관람 후기"} />
      <main>
        <Suspense fallback={<ReviewItemSkeleton count={5} />}>
          <ReviewList />
        </Suspense>
      </main>
      <aside>
        <FloatingButton>
          <Link href={"/review/new/search"} className="h-full flex-center">
            <Image src={plus} width={36} height={36} alt="새 리뷰 작성" />
          </Link>
        </FloatingButton>
      </aside>
    </>
  );
}
