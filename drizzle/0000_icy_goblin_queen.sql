CREATE SCHEMA "users_schema";
--> statement-breakpoint
CREATE TYPE "users_schema"."role" AS ENUM('user', 'admin', 'moderator');--> statement-breakpoint
CREATE TABLE "general_expenditure_schema"."general_expenditure" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_code" text,
	"account_title" text,
	"activity" text,
	"category" text,
	"estimated_cost" numeric,
	"indicator" text,
	"kra" text,
	"month" text,
	"year" integer,
	"purpose" text,
	"resources_description" text,
	"resources_quantity" integer,
	"ar_code" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "users_schema"."role" DEFAULT 'user' NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"isEmailVerified" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
