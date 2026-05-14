CREATE SCHEMA "app_schema";

CREATE TYPE "app_schema"."role" AS ENUM('user', 'admin', 'moderator');
CREATE TABLE "app_schema"."general_expenditure" (
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
	"ar_code" serial NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "general_expenditure_ar_code_unique" UNIQUE("ar_code")
);

CREATE TABLE "app_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "app_schema"."role" DEFAULT 'user' NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"isEmailVerified" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
