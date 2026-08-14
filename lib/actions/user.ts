"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "../auth";
import { prisma } from "../prisma";

export type SettingsFormState = { error?: string; ok?: boolean } | null;

const USERNAME_RE = /^[a-z0-9_]+$/;

export async function updateUsernameAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "You must be signed in to do that." };
  }

  const raw = String(formData.get("username") ?? "").trim().toLowerCase();

  if (raw.length < 3 || raw.length > 20) {
    return { error: "Username must be between 3 and 20 characters." };
  }
  if (!USERNAME_RE.test(raw)) {
    return {
      error: "Username can only contain lowercase letters, numbers, and underscores.",
    };
  }

  try {
    await prisma.userProfile.update({
      where: { id: userId },
      data: { username: raw },
    });
  } catch (err: unknown) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "P2002") {
      return { error: "That username is already taken." };
    }
    return { error: "Could not update username. Please try again." };
  }

  revalidatePath("/settings");
  revalidatePath("/");
  return { ok: true };
}
