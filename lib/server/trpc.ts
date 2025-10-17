import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().default('World') }).optional())
    .query(async ({ input }) => {
      return {
        greeting: `Hello, ${input?.name || 'World'}! Welcome to the tRPC + Next.js application.`,
        timestamp: new Date().toISOString(),
      };
    }),
});

export type AppRouter = typeof router;
