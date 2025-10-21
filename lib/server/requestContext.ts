import { AsyncLocalStorage } from 'node:async_hooks';

export type RequestContext = {
  userId: string | null;
};

export const requestContext = new AsyncLocalStorage<RequestContext>();


