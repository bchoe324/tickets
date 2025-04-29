import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShowItemContent() {
  return (
    <div className="show-list-layout">
      <div className="poster">
        <Skeleton
          containerClassName="flex w-full h-full rounded-[4px]"
          height={"100%"}
        />
      </div>
      <div className="info">
        <Skeleton containerClassName="title" width={"50%"} />
        <Skeleton />
        <Skeleton width={271} />
      </div>
    </div>
  );
}

export default function ShowItemSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <ShowItemContent key={`show-item-skeleton-${idx}`} />);
}
