import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").unique(),
  coins: integer("coins").default(0),
  xp: integer("xp").default(0),
  level: integer("level").default(1),
  streak: integer("streak").default(0),
  lastActiveDate: timestamp("last_active_date"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Quests table
export const quests = pgTable("quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // budgeting, investing, savings, etc.
  difficulty: integer("difficulty").default(1), // 1-5
  estimatedMinutes: integer("estimated_minutes").default(15),
  xpReward: integer("xp_reward").default(100),
  coinReward: integer("coin_reward").default(25),
  questions: jsonb("questions").notNull(), // Array of question objects
  educationalContent: jsonb("educational_content"), // Educational sections
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// User Progress table
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  questId: varchar("quest_id").notNull().references(() => quests.id),
  isCompleted: boolean("is_completed").default(false),
  currentQuestion: integer("current_question").default(0),
  score: integer("score").default(0),
  timeSpent: integer("time_spent").default(0), // in seconds
  answers: jsonb("answers"), // User's answers
  completedAt: timestamp("completed_at"),
  startedAt: timestamp("started_at").default(sql`now()`),
});

// Achievements table
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  requirements: jsonb("requirements").notNull(), // Criteria for unlocking
  xpReward: integer("xp_reward").default(50),
  coinReward: integer("coin_reward").default(25),
  isActive: boolean("is_active").default(true),
});

// User Achievements table
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementId: varchar("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").default(sql`now()`),
});

// Daily Challenges table
export const dailyChallenges = pgTable("daily_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  questId: varchar("quest_id").notNull().references(() => quests.id),
  bonusXp: integer("bonus_xp").default(50),
  bonusCoins: integer("bonus_coins").default(10),
});

// Auric Tips table
export const auricTips = pgTable("auric_tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  category: text("category").notNull(), // motivational, educational, welcome
  context: text("context"), // when to show this tip
  isActive: boolean("is_active").default(true),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertQuestSchema = createInsertSchema(quests).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  startedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertDailyChallengeSchema = createInsertSchema(dailyChallenges).omit({
  id: true,
});

export const insertAuricTipSchema = createInsertSchema(auricTips).omit({
  id: true,
});

// Infer types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuest = z.infer<typeof insertQuestSchema>;
export type Quest = typeof quests.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;

export type InsertDailyChallenge = z.infer<typeof insertDailyChallengeSchema>;
export type DailyChallenge = typeof dailyChallenges.$inferSelect;

export type InsertAuricTip = z.infer<typeof insertAuricTipSchema>;
export type AuricTip = typeof auricTips.$inferSelect;
