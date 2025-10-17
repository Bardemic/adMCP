# AdMCP

Get paid for ads in your AI conversations

inspired by https://x.com/ericzakariasson/status/1978641547341291812

questions? dm @DemicLive on twitter

## Setup

### Authentication with Better Auth

This project uses Better Auth for GitHub OAuth authentication with Drizzle ORM.

#### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/admcp

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth (https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### Setup GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name:** Your app name
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local`

#### Database

Run migrations to create/update the authentication tables:

```bash
npm run db:generate
npm run db:migrate
```

### tRPC with Authentication

The project exports two procedure types:

- **`publicProcedure`**: Accessible to all users
- **`protectedProcedure`**: Throws `UNAUTHORIZED` error if user is not authenticated

Example usage in `lib/server/trpc.ts`:

```typescript
export const router = t.router({
  publicEndpoint: publicProcedure.query(() => {
    return 'Hello, everyone!';
  }),
  
  protectedEndpoint: protectedProcedure.query(({ ctx }) => {
    return `Hello, ${ctx.user.name}!`;
  }),
});
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`