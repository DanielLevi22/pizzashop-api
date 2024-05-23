ALTER TABLE "restaurants" RENAME COLUMN "email" TO "manager_id";--> statement-breakpoint
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_email_unique";--> statement-breakpoint
ALTER TABLE "restaurants" ALTER COLUMN "manager_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurants" ADD COLUMN "description" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
