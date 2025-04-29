import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ReviewItemContent() {
  return (
    <div className="review-item-layout">
      <div className="poster">
        <Skeleton
          containerClassName="flex w-full h-full rounded-[4px]"
          height={"100%"}
        />
        <Skeleton
          containerClassName="icon"
          width={"100%"}
          height={"100%"}
          circle={true}
        />
      </div>
      <div className="text">
        <Skeleton containerClassName="title" />
        <Skeleton containerClassName="review" count={3} />
      </div>
      <Skeleton containerClassName="created_time" width={"80px"} />
    </div>
  );
}

export default function ReviewItemSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <ReviewItemContent key={`review-item-skeleton-${idx}`} />);
}
