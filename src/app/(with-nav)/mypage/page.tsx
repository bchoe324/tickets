import ProfileIcon from "@/assets/icons/ProfileIcon";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

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
      <section className="profile-card">
        <div>
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
        <div>
          <div>
            <div>{userData.name}</div>
            <div>{userData.email}</div>
            <div>{format(userData.createdAt, "yyyy년 M월 d일")}에 가입</div>
          </div>
          <button>프로필 수정</button>
        </div>
      </section>
      <section>
        <ul>
          <li>
            <Link href={`/review/list?filter=myReview`}>내가 쓴 리뷰</Link>
          </li>
          <li>
            <Link href={""}>관심 있는 공연</Link>
          </li>
        </ul>
        <div>
          <button>로그아웃</button>
          <button>회원 탈퇴</button>
        </div>
      </section>
    </>
  );
}
