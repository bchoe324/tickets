import ProfileIcon from "@/assets/icons/ProfileIcon";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import NextIcon from "@/assets/icons/NextIcon";
import { getAccessToken } from "@/utils/get-access-token";
import UserActionButtons from "@/components/mypage/user-action-buttons";
import { Suspense } from "react";
import ProfileCardSkeleton from "@/components/skeleton/profile-card-skeleton";

const subPages = [
  { title: "내 관람 후기", href: "review/my-review/" },
  { title: "관심 있는 공연", href: "" },
];

async function ProfileCard() {
  const accessToken = await getAccessToken();
  let userData;

  if (!accessToken) {
    return <></>;
  }
  try {
    // await delay(30000);
    const response = await fetch(`api/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    userData = await response.json();
  } catch (error) {
    console.error(error);
    return <div>유저 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <div className="flex-auto w-1/3 min-w-[80px] aspect-square rounded-[50%] overflow-hidden *:block *:w-full *:h-full *:object-cover">
        {userData.avatarUrl ? (
          <Image
            src={userData.avatarUrl}
            width={175}
            height={175}
            alt="프로필 이미지"
          />
        ) : (
          <ProfileIcon fill="#999" />
        )}
      </div>
      <div className="ml-layout flex-[1_1_70%] flex flex-col">
        <div>
          <div className="text-[20px] font-medium">{userData.name}</div>
          <div className="text-zinc-400 mt-[2px]">{userData.email}</div>
          <div className="text-[14px] text-zinc-400 mt-[5px]">
            {format(userData.createdAt, "yyyy년 M월 d일")}에 가입
          </div>
        </div>
        <Link
          href={"/mypage/edit-profile"}
          className="mt-layout py-[10px] px-layout rounded-[20px] border border-primary-400 text-primary-400 self-end"
        >
          프로필 수정
        </Link>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <section className="flex-start py-[40px] px-layout border-b border-zinc-300">
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense>
      </section>
      <section>
        <ul className="flex flex-col">
          {subPages.map((item) => (
            <li key={item.title} className="border-b border-zinc-300">
              <Link
                href={item.href}
                className="w-full p-layout flex-between [&_svg]:w-[32px]"
              >
                <span className="text-[18px]">{item.title}</span>
                <NextIcon fill="currentColor" />
              </Link>
            </li>
          ))}
        </ul>
        <UserActionButtons />
      </section>
    </>
  );
}
