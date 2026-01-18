import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  plan: varchar("plan", { length: 20 })
    .default("FREE")
    .notNull(),
  password: varchar("password"),
  credits: integer("credits")
    .notNull(),
  captionsUsedToday: integer("captions_used_today")
    .default(0)
    .notNull(),
  lastRefillAt: timestamp("last_refill_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

