"use server";

import { cookies } from "next/headers";

export default async function logoutAction() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
}
