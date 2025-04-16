import DetailHeader from "@/components/detail-header";
import FloatingButton from "@/components/floating-button";
import NoContent from "@/components/no-contents";
import ReviewItem from "@/components/review-item";
import fetchReviewData from "@/lib/fetch-review-data";
import { ReviewData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default async function Page() {
  const reviews: ReviewData[] = await fetchReviewData("myreview");

  return (
    <>
      <DetailHeader centerChild={"내 관람 후기"} />
      <main>
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
