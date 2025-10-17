import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { auth } from './auth';

export const createContext = async ({
  session,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) => {
  return {
    user: session?.user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthed);

export const router = t.router({
  hello: publicProcedure
    .input(z.object({ name: z.string().default('World') }).optional())
    .query(async ({ input }) => {
      return {
        greeting: `Hello, ${input?.name || 'World'}! Welcome to the tRPC + Next.js application.`,
        timestamp: new Date().toISOString(),
      };
    }),
});

export type AppRouter = typeof router;
