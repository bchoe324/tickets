import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const accessToken = (await cookies()).get("access_token");
  const token = accessToken?.value;
  console.log("token", token);

  if (!token) redirect("/login");

  return <>{children}</>;
}
