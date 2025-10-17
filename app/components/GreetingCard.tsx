interface GreetingCardProps {
  greeting: string;
  timestamp: string;
}

export function GreetingCard({ greeting, timestamp }: GreetingCardProps) {
  return (
    <div>
      <p>{greeting}</p>
      <p>{new Date(timestamp).toISOString()}</p>
    </div>
  );
}
