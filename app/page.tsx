import { SignInWithGithub } from './components/SignInWithGithub';

export default async function Home() {
  return (
    <main className="center-screen">
      <div className="container">
        <h1 className="title">Welcome</h1>
        <p className="subtitle">Sign in to continue</p>
        <SignInWithGithub />
      </div>
    </main>
  );
}
