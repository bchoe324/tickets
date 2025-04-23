import fetchRankData from "@/lib/fetch-rank-data";
import RankSlide from "@/components/show/rank-slide";
import Link from "next/link";
import NextIcon from "@/assets/icons/NextIcon";
import { toast } from "sonner";
import fetchReviewData from "@/lib/fetch-review-data";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review/review-item";

function ToastOnJoin({ joined }: { joined?: string }) {
  "use client";
  if (joined) {
    toast.success(
      "회원가입이 완료되었습니다. 가입한 이메일로 전송된 인증 링크를 확인해주세요."
    );
  }
  return null;
}

async function RecentReviews() {
  const reviews: ReviewData[] = await fetchReviewData("recent");
  console.log(reviews);

  return (
    <>
      {reviews.map((review) => (
        <div key={review.createdAt} className="review-item-layout">
          <ReviewItem review={review} isMenuVisible={false} />
        </div>
      ))}
    </>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ joined?: string }>;
}) {
  const joined = await searchParams;
  const rankData = await fetchRankData();
  if (!rankData) return;
  const rankArray = rankData?.slice(0, 9);

  return (
    <>
      <ToastOnJoin joined={joined?.joined} />
      <section className="home-section pr-0">
        <div className="h2">
          <h2>공연 순위</h2>
          <Link href={"/show"} className="flex-[0_0_auto] flex ">
            더보기{" "}
            <span className="w-[24px]">
              <NextIcon fill="currentColor" />
            </span>
          </Link>
        </div>
        <div className="px-layout">
          <RankSlide rankArray={rankArray} />
        </div>
      </section>
      <section className="home-section">
        <div className="h2">
          <h2>공연 리뷰</h2>
          <Link href={"/review"} className="flex-[0_0_auto] flex ">
            더보기{" "}
            <span className="w-[24px]">
              <NextIcon fill="currentColor" />
            </span>
          </Link>
        </div>
        <RecentReviews />
      </section>
    </>
  );
}
