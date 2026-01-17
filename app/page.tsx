"use client";

import { SignInWithGithub } from './components/SignInWithGithub';
import { SignInAsGuest } from './components/SignInAsGuest';
import { useState } from 'react';

export default function Home() {
  const [isGuest, setIsGuest] = useState(false);

  if (isGuest) {
    return (
      <main className="center-screen">
        <div className="container">
          <h1 className="title">Welcome, Guest!</h1>
          <p className="subtitle">You are now signed in.</p>
          <button className="btn-outline" onClick={() => setIsGuest(false)}>Sign out</button>
        </div>
      </main>
    );
  }

  return (
    <main className="center-screen">
      <div className="container">
        <h1 className="title">Welcome</h1>
        <p className="subtitle">Sign in to continue</p>
        <SignInWithGithub />
        <SignInAsGuest onSignIn={() => setIsGuest(true)} />
      </div>
    </main>
  );
}
