import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const accessToken = (await cookies()).get("access_token");
  console.log("access_token", accessToken);

  if (!accessToken) redirect("/login");

  return <>{children}</>;
}
