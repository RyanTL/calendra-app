ALTER TABLE "scheduleAvailability" RENAME TO "scheduleAvailabilities";--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" DROP CONSTRAINT "scheduleAvailability_scheduleId_schedules_id_fk";
--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ADD CONSTRAINT "scheduleAvailabilities_scheduleId_schedules_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;