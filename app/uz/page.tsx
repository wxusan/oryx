import { redirect } from "next/navigation";

// /uz is no longer the canonical Uzbek URL — root "/" serves Uzbek.
// next.config.ts adds a permanent 308 redirect, but this page
// handles any direct navigation that bypasses the redirect.
export default function UzPage() {
  redirect("/");
}
