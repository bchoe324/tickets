import fetchReviewData from "@/lib/fetch-review-data";
import ReviewItem from "@/components/review/review-item";
import { ReviewData } from "@/types";
import DetailHeader from "@/components/common/detail-header";
import FloatingButton from "@/components/review/floating-button";
import Link from "next/link";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";
import { Suspense } from "react";
import ReviewItemSkeleton from "@/components/skeleton/review-item-skeleton";

async function ReviewList() {
  const reviews: ReviewData[] = await fetchReviewData();
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review-item-layout" key={review.createdAt}>
            <ReviewItem review={review} isMenuVisible={false} />
          </div>
        ))
      ) : (
        <p>리뷰 데이터를 불러올 수 없습니다.</p>
      )}
    </>
  );
}

export default function Page() {
  return (
    <>
      <DetailHeader centerChild={"공연 리뷰"} />
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
