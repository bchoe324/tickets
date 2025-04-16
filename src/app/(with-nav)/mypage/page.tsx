import ProfileIcon from "@/assets/icons/ProfileIcon";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import NextIcon from "@/assets/icons/NextIcon";

const subPages = [
  { title: "내 관람 후기", href: "review/my-review/" },
  { title: "관심 있는 공연", href: "" },
];

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return <></>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/user`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const userData = await response.json();
  return (
    <>
      <section className="flex-start py-[40px] px-layout border-b border-zinc-300">
        <div className="flex-auto w-1/3 min-w-[80px] aspect-square rounded-[50%] overflow-hidden *:block *:w-full *:h-full *:object-cover">
          {userData.avatarUrl ? (
            <Image
              src={userData.avatarUrl}
              width={80}
              height={80}
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
        <div className="py-[10px] px-layout mt-[10px] flex-start *:text-zinc-400">
          <button>로그아웃</button>
          <span className="w-px h-[16px] bg-zinc-400 mx-[10px]"></span>
          <button>회원 탈퇴</button>
        </div>
      </section>
    </>
  );
}
