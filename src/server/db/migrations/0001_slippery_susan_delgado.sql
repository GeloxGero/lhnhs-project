CREATE TABLE "app_schema"."expense_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"unspc" text,
	"description" text,
	"specification" text,
	"unit_of_measure" text,
	"quantity" integer,
	"price" numeric,
	"total" numeric,
	"ar_code" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
