CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE TABLE "auth"."accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ad_impressions" (
	"id" serial PRIMARY KEY NOT NULL,
	"advertisement_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"reward_cents" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "advertisements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "auth"."oauth_access_token" (
	"id" text PRIMARY KEY NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"client_id" text,
	"user_id" text,
	"scopes" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "oauth_access_token_access_token_unique" UNIQUE("access_token"),
	CONSTRAINT "oauth_access_token_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
CREATE TABLE "auth"."oauth_application" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"icon" text,
	"metadata" text,
	"client_id" text,
	"client_secret" text,
	"redirect_ur_ls" text,
	"type" text,
	"disabled" boolean DEFAULT false,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "oauth_application_client_id_unique" UNIQUE("client_id")
);
--> statement-breakpoint
CREATE TABLE "auth"."oauth_consent" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text,
	"user_id" text,
	"scopes" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"consent_given" boolean
);
--> statement-breakpoint
CREATE TABLE "auth"."sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "auth"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "auth"."verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth"."accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_impressions" ADD CONSTRAINT "ad_impressions_advertisement_id_advertisements_id_fk" FOREIGN KEY ("advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_impressions" ADD CONSTRAINT "ad_impressions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_impressions" ADD CONSTRAINT "advertisement_fk" FOREIGN KEY ("advertisement_id") REFERENCES "public"."advertisements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_impressions" ADD CONSTRAINT "user_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."oauth_access_token" ADD CONSTRAINT "oauth_access_token_client_id_oauth_application_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "auth"."oauth_application"("client_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."oauth_access_token" ADD CONSTRAINT "oauth_access_token_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."oauth_application" ADD CONSTRAINT "oauth_application_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."oauth_consent" ADD CONSTRAINT "oauth_consent_client_id_oauth_application_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "auth"."oauth_application"("client_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."oauth_consent" ADD CONSTRAINT "oauth_consent_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;