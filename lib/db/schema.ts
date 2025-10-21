import { pgTable, text, serial, timestamp, boolean, pgSchema, integer, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const advertisements = pgTable('advertisements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content').notNull(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const adImpressions = pgTable('ad_impressions', {
  id: serial('id').primaryKey(),
  advertisementId: integer('advertisement_id').notNull().references(() => advertisements.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  rewardCents: integer('reward_cents').notNull(),
});





export const auth = pgSchema('auth');

export const users = auth.table('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sessions = auth.table('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = auth.table('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verifications = auth.table('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// OIDC Provider / MCP plugin tables
export const oauthApplication = auth.table('oauth_application', {
  id: text('id').primaryKey(),
  name: text('name'),
  icon: text('icon'),
  metadata: text('metadata'),
  clientId: text('client_id').unique(),
  clientSecret: text('client_secret'),
  redirectURLs: text('redirect_ur_ls'),
  type: text('type'),
  disabled: boolean('disabled').default(false),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const oauthAccessToken = auth.table('oauth_access_token', {
  id: text('id').primaryKey(),
  accessToken: text('access_token').unique(),
  refreshToken: text('refresh_token').unique(),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  clientId: text('client_id').references(() => oauthApplication.clientId, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  scopes: text('scopes'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const oauthConsent = auth.table('oauth_consent', {
  id: text('id').primaryKey(),
  clientId: text('client_id').references(() => oauthApplication.clientId, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  scopes: text('scopes'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  consentGiven: boolean('consent_given'),
});

export const adImpressionsRelations = relations(adImpressions, ({ one }) => ({
  advertisement: one(advertisements, {
    fields: [adImpressions.advertisementId],
    references: [advertisements.id],
  }),
  user: one(users, {
    fields: [adImpressions.userId],
    references: [users.id],
  }),
}));

export const advertisementsRelations = relations(advertisements, ({ many }) => ({
  adImpressions: many(adImpressions),
}));
