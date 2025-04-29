import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileCardSkeleton() {
  return (
    <>
      <Skeleton
        width={"100%"}
        height={"100%"}
        circle={true}
        containerClassName="block w-1/3 min-w-[80px] aspect-square"
      />
      <div className="ml-layout flex-[1_1_70%] flex flex-col">
        <Skeleton width={100} height={20} containerClassName="flex-auto" />
        <Skeleton width={150} containerClassName="flex-auto mt-[5px]" />
        <Skeleton width={150} containerClassName="flex-auto mt-[5px]" />
      </div>
    </>
  );
}
