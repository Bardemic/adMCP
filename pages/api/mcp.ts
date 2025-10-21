import type { NextApiRequest, NextApiResponse } from 'next';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { server } from '@/lib/server/mcp';
import { auth } from '@/lib/server/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (typeof value === 'string') {
      headers.set(key, value);
    }
  }

  const mcpSession = await auth.api.getMcpSession({ headers });
  if (!mcpSession) {
    res.status(401).end('Unauthorized');
    return;
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on('close', () => {
    transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req as any, res as any, req.body);
}
