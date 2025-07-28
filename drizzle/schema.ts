//define the "events" table with fields like name, description, and duration

import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { table } from "console";
import { relations } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//define a reusable `createdAt` timestamps column with the default value set to now 
const createdAt = timestamp("createdAt").notNull().defaultNow()

//define a reusable `updatedAt` timestamp column with automatic update on modification
const updatedAt = timestamp("updatedAt")
.notNull()
.defaultNow()
.$onUpdate(() => new Date())//automatically updates to current time on update



export const EventTable = pgTable(
    "events", //table name in the database
    {
        id:uuid("id").primaryKey().defaultRandom(), //unique identifier for each event
        //uuid("id"): defines a column named "id" with the UUID type
        //primaryKey(): makes this UUID the primary key of the table
        //defaultRandom(): automatically fills this column with a randomly generated UUID (v4) if no value is provided

        name: text("name").notNull(), //event name required
        description: text("description"),//optional description
        durationInMinutes: integer("durationInMinutes").notNull(),//duration of the event
        clerkUserId: text("clerkUserId").notNull(), //id of the user who create it(from clerk)
        isActive: boolean("isActive").notNull().default(true),//wheter the event is currently active
        createdAt, //timestamp when event was created
        updatedAt, //timestamp when event was updated
    
    },
    table => ([
        index("clerkUserIndex").on(table.clerkUserId),//index on clerkUserId for faster querying
    ])

,)

export const ScheduleTable = pgTable("schedules", {
    id: uuid("id").primaryKey().defaultRandom(), //primary key with random UUID
    timezone: text("timezone").notNull(), //user timezone
    clerkUserId: text("clerkUserId").notNull().unique(),//unique userID from clerk
    createdAt, //timestamp when schedule was created
    updatedAt, //timestamp when schedule was updated
})

//define relationships for the ScheduleTable: a schedule has many availabilities
export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
    availabilities: many(ScheduleAvailabilityTable), //one-to-many relationship
}))


//define a PostgreSQL ENUM for the days of the week
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER)

export const ScheduleAvailabilityTable = pgTable(
    "scheduleAvailabilities",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        scheduleId: uuid("scheduleId")//foreign key to the schedule table
        .notNull()
        .references(() => ScheduleTable.id, { onDelete: "cascade"}),//cascade delete when schedule is deleted

        startTime: text("startTime").notNull(), //start time of availability (e.g 09:00)
        endTime: text("endTime").notNull(), //end time of availability (e.g 17:00)
        dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),//day of the week(ENUM)
    },
    table => ([
        index("scheduleIdIndex").on(table.scheduleId),//index on foreign key for faster lookups
    ])
)

export const scheduleAvailabilityRelations = relations(
    ScheduleAvailabilityTable, ({ one }) => ({
    schedule: one(ScheduleTable, {
        fields: [ScheduleAvailabilityTable.scheduleId], //local key
        references: [ScheduleTable.id], //foreign key
    }),
})
)




