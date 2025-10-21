import Image from 'next/image';
import { headers } from 'next/headers';
import { auth } from '@/lib/server/auth';
import { SignOutButton } from '../components/SignOutButton';
import styles from './home.module.css';
import { redirect} from 'next/navigation';
import { router, createContext } from '@/lib/server/trpc';
import AdImpression from '../components/adImpression/adImpression';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect('/');
  const context = await createContext({ session });
  const recentImpressions = await router.createCaller(context).recentImpressions();

  return (
    <main className={styles.centerScreen}>
      <div className={styles.recentlyViewed}>
        {recentImpressions.map((impression) => {
          return (
            <AdImpression
              key={impression.id}
              impression={{
                created_at: impression.createdAt,
                reward_cents: impression.rewardCents,
                ad_title: impression.advertisement.title,
              }}
            />
          )
        })}
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>GitHub</h1>
        {user ? (
          <div className={styles.userRow}>
            {user.image ? (
              <Image src={user.image} alt="avatar" width={48} height={48} className={styles.avatar} unoptimized />
            ) : null}
            <div>
              <div>{user.name || user.email}</div>
              <div className={`${styles.subtitle} ${styles.email}`}>{user.email}</div>
            </div>
          </div>
        ) : null}
        {user ? (
          <div className={styles.signOutWrap}>
            <SignOutButton />
          </div>
        ) : (
          <p className={styles.subtitle}>Not signed in.</p>
        )}
      </div>
    </main>
  );
}


