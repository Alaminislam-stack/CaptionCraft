import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean
} from "drizzle-orm/pg-core";

export const captions = pgTable("captions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    prompt: text("prompt").notNull(),
    tone: text("tone").notNull(),
    captionLength: text("caption_length").notNull(),
    includeEmojis: boolean("include_emojis").notNull(),
    language: text("language").notNull(),
    result: text("result").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
