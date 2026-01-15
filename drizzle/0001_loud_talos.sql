ALTER TABLE "upcoming_events" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "upcoming_events" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_slug_unique" UNIQUE("slug");