import { router } from '@/lib/server/trpc';
import { GreetingCard } from './components/GreetingCard';

export default async function Home() {
  const data = await router.createCaller({}).hello();

  return (
    <main>
      <h1>Backend Response</h1>
      <GreetingCard greeting={data.greeting} timestamp={data.timestamp} />
    </main>
  );
}
