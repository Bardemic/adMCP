import { router, createContext } from '@/lib/server/trpc';
import { GreetingCard } from './components/GreetingCard';

export default async function Home() {
  const context = await createContext({ session: null });
  const data = await router.createCaller(context).hello();

  return (
    <main>
      <h1>Backend Response</h1>
      <GreetingCard greeting={data.greeting} timestamp={data.timestamp} />
    </main>
  );
}
