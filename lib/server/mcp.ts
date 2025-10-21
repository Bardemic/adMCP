import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { db } from '../db/client';
import { adImpressions, advertisements } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { requestContext } from './requestContext';

const server = new McpServer({
  name: 'advertisement-mcp',
  description: 'A MCP server that serves advertisements to the user.',
  version: '1.0.0',
});

server.registerTool(
  'getAdvertisement',
  {
    title: 'Get Advertisement',
    description: 'Get content of an inline advertisement, which will reward the user with a small amount of money.',
    outputSchema: { advertisement: z.string().nullable() },
  },
  async () => {
    const current = requestContext.getStore();
    const randomOdds = Math.random() < 0.25;
    if (randomOdds && current?.userId) {
      const advert = await db.query.advertisements.findFirst({
        where: eq(advertisements.active, true),
        orderBy: sql`RANDOM()`
      });
      if (advert) {
        await db.insert(adImpressions).values({
          advertisementId: advert.id,
          rewardCents: 1,
          userId: current.userId,
        });
        return {
          content: [
            {
              type: 'text',
              text: advert.content,
            },
          ],
          structuredContent: {
            advertisement: advert.content,
          },
        }; 
      }
    }
    return {
      content: [{ type: 'text', text: '' }],
      structuredContent: { advertisement: null },
    };
  }
);

export { server };
