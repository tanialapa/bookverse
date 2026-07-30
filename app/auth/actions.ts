"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getFormValue(formData: FormData, name: string, trim = false) {
  const value = formData.get(name);
  return typeof value === "string" ? (trim ? value.trim() : value) : "";
}

function redirectWithMessage(
  path: "/sign-in" | "/sign-up",
  key: "error" | "message",
  message: string,
): never {
  redirect(`${path}?${key}=${encodeURIComponent(message)}`);
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");

  if (!origin) {
    return null;
  }

  try {
    const url = new URL(origin);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.origin
      : null;
  } catch {
    return null;
  }
}

export async function signIn(formData: FormData) {
  const email = getFormValue(formData, "email", true);
  const password = getFormValue(formData, "password");

  if (!email || !email.includes("@") || !password) {
    redirectWithMessage(
      "/sign-in",
      "error",
      "Enter a valid email address and password.",
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWithMessage(
      "/sign-in",
      "error",
      "Unable to sign in. Check your email and password.",
    );
  }

  redirect("/");
}

export async function signUp(formData: FormData) {
  const email = getFormValue(formData, "email", true);
  const password = getFormValue(formData, "password");
  const confirmPassword = getFormValue(formData, "confirmPassword");

  if (!email || !email.includes("@")) {
    redirectWithMessage(
      "/sign-up",
      "error",
      "Enter a valid email address.",
    );
  }

  if (password.length < 8) {
    redirectWithMessage(
      "/sign-up",
      "error",
      "Password must be at least 8 characters.",
    );
  }

  if (password !== confirmPassword) {
    redirectWithMessage(
      "/sign-up",
      "error",
      "Passwords do not match.",
    );
  }

  const origin = await getRequestOrigin();

  if (!origin) {
    redirectWithMessage(
      "/sign-up",
      "error",
      "Unable to create an account. Please try again.",
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirectWithMessage(
      "/sign-up",
      "error",
      "Unable to create an account. Please try again.",
    );
  }

  redirectWithMessage(
    "/sign-in",
    "message",
    "Check your email to confirm your account.",
  );
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
