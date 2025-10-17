"use client";

import { createAuthClient } from "better-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const authClient = createAuthClient();

export function SignInWithGithub() {
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/github",
        errorCallbackURL: "/",
      });
    } catch (err) {
      setIsLoading(false);
    }
  }

  return (
    <button className="btn-outline" onClick={onClick} aria-label="Sign in with GitHub" disabled={isLoading}>
      <FaGithub width={20} height={20} />
      {isLoading ? "Redirecting..." : "Sign in with GitHub"}
    </button>
  );
}


