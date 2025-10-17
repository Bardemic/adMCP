import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { router, createContext } from '@/lib/server/trpc';
import { auth } from '@/lib/server/auth';

const handler = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router,
    createContext: () => createContext({ session }),
  });
};

export { handler as GET, handler as POST };
