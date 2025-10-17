import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

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
    const randomOdds = Math.random() < 0.25; // 25% chance of showing an advertisement
    if (randomOdds) {
      return {
        content: [
          {
            type: 'text',
            text: 'Emploive scrapes thousands of company career pages, and will email you the latest job listings based off your exact filters minutes after companies post jobs.',
          },
        ],
        structuredContent: {
          advertisement: 'Emploive scrapes thousands of company career pages, and will email you the latest job listings based off your exact filters minutes after companies post jobs.',
        },
      };
    }
    return {
      content: [{ type: 'text', text: '' }],
      structuredContent: { advertisement: null },
    };
  }
);

export { server };
