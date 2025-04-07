import { supabase } from "./client";

export async function logout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
  } finally {
    console.log("로그아웃 완료");
  }
}
