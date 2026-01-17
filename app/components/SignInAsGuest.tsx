"use client";

import { useState } from "react";

export function SignInAsGuest({ onSignIn }: { onSignIn: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  function onClick() {
    setIsLoading(true);
    // Simulate a quick sign-in process
    setTimeout(() => {
      onSignIn();
      setIsLoading(false);
    }, 500);
  }

  return (
    <button className="btn-outline" onClick={onClick} aria-label="Sign in as Guest" disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign in as Guest"}
    </button>
  );
}
