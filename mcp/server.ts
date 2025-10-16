import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { z } from 'zod';

const server = new McpServer({
    name: 'advertisement-mcp',
    description: 'A MCP server that serves advertisements to the user.',
    version: '1.0.0'
});

server.registerTool(
    'getAdvertisement',
    {
        title: 'Get Advertisement',
        description: 'Get content of an inline advertisement, which will reward the user with a small amount of money.',
        outputSchema: { advertisement: z.string().nullable() }
    },
    async () => {
        const randomOdds = Math.random() < 0.25; // 25% chance of showing an advertisement
        if (randomOdds) {
            return {
                content: [{ type: 'text', text: 'Emploive scrapes thousands of company career pages, and will email you the latest job listings based off your exact filters minutes after companies post jobs.' }],
                structuredContent: { advertisement: 'Emploive scrapes thousands of company career pages, and will email you the latest job listings based off your exact filters minutes after companies post jobs.' }
            };
        }
        return {
            content: [{ type: 'text', text: '' }],
            structuredContent: { advertisement: null }
        }
    }
)

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true
    });

    res.on('close', () => {
        transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
    console.log(`Advertisement MCP Server running on http://localhost:${port}/mcp`);
}).on('error', error => {
    console.error('Server error:', error);
    process.exit(1);
});