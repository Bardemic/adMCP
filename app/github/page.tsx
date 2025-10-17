import Image from 'next/image';
import { headers } from 'next/headers';
import { auth } from '@/lib/server/auth';
import { SignOutButton } from '../components/SignOutButton';

export default async function GithubPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <main className="center-screen">
      <div className="container">
        <h1 className="title">GitHub</h1>
        {user ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
            {user.image ? (
              <Image src={user.image} alt="avatar" width={48} height={48} style={{ borderRadius: 9999 }} unoptimized />
            ) : null}
            <div>
              <div>{user.name || user.email}</div>
              <div className="subtitle" style={{ marginTop: 4 }}>{user.email}</div>
            </div>
          </div>
        ) : null}
        {user ? (
          <div style={{ marginTop: '1.5rem' }}>
            <SignOutButton />
          </div>
        ) : (
          <p className="subtitle">Not signed in.</p>
        )}
      </div>
    </main>
  );
}


