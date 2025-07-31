import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/user/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Quest routes
  app.get("/api/quests", async (req, res) => {
    try {
      const quests = await storage.getAllQuests();
      res.json(quests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quests" });
    }
  });

  app.get("/api/quest/:id", async (req, res) => {
    try {
      const quest = await storage.getQuest(req.params.id);
      if (!quest) {
        return res.status(404).json({ message: "Quest not found" });
      }
      res.json(quest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quest" });
    }
  });

  // User progress routes
  app.get("/api/user/:userId/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get("/api/user/:userId/progress/:questId", async (req, res) => {
    try {
      const progress = await storage.getUserQuestProgress(
        req.params.userId,
        req.params.questId
      );
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quest progress" });
    }
  });

  app.post("/api/user/:userId/progress", async (req, res) => {
    try {
      const validation = insertUserProgressSchema.safeParse({
        ...req.body,
        userId: req.params.userId,
      });

      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid progress data",
          errors: validation.error.errors 
        });
      }

      const progress = await storage.createOrUpdateUserProgress(validation.data);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  app.post("/api/user/:userId/complete-quest/:questId", async (req, res) => {
    try {
      const { score, timeSpent } = req.body;
      
      if (typeof score !== 'number' || typeof timeSpent !== 'number') {
        return res.status(400).json({ message: "Score and timeSpent must be numbers" });
      }

      const progress = await storage.completeQuest(
        req.params.userId,
        req.params.questId,
        score,
        timeSpent
      );
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete quest" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get("/api/user/:userId/achievements", async (req, res) => {
    try {
      const achievements = await storage.getUserAchievements(req.params.userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  app.post("/api/user/:userId/unlock-achievement/:achievementId", async (req, res) => {
    try {
      const userAchievement = await storage.unlockAchievement(
        req.params.userId,
        req.params.achievementId
      );
      res.json(userAchievement);
    } catch (error) {
      res.status(500).json({ message: "Failed to unlock achievement" });
    }
  });

  // Auric Tips routes
  app.get("/api/auric-tip", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const tip = await storage.getRandomAuricTip(category);
      if (!tip) {
        return res.status(404).json({ message: "No tips available" });
      }
      res.json(tip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tip" });
    }
  });

  app.get("/api/auric-tips", async (req, res) => {
    try {
      const tips = await storage.getAllAuricTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
