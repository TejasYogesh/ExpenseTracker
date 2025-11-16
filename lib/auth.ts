import { supabase } from "./supabase";

export async function getUserServer() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
