import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RankSlideSkeleton() {
  return (
    <div className="">
      <Skeleton
        containerClassName="overflow-hidden flex-start"
        className="flex-fixed aspect-3/4 mr-[10px] last-of-type:mr-0"
        borderRadius={0}
        count={3}
        width={"calc((100% - 20px) / 2.4)"}
      />
    </div>
  );
}
