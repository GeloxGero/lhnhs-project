ALTER TABLE "app_schema"."expense_item" ADD COLUMN "image_url" text;
ALTER TABLE "app_schema"."expense_item" ADD COLUMN "verified" boolean DEFAULT false NOT NULL;
ALTER TABLE "app_schema"."general_expenditure" ADD COLUMN "verified" boolean DEFAULT false NOT NULL;
ALTER TABLE "app_schema"."general_expenditure" ADD COLUMN "image_url" text;