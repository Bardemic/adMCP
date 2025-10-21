import { SignInWithGithub } from "@/app/components/SignInWithGithub";

export default function SignInPage() {
  return (
    <main className="center-screen">
      <div className="container">
        <h1 className="title">Sign in</h1>
        <div style={{ marginTop: "1rem" }}>
          <SignInWithGithub />
        </div>
      </div>
    </main>
  );
}


