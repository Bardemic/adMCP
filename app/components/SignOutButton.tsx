"use client";

import { createAuthClient } from "better-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const authClient = createAuthClient();

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onClick() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await authClient.signOut();
      router.replace("/");
    } catch (err) {
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button className="btn-outline" onClick={onClick} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Sign out"}
    </button>
  );
}


