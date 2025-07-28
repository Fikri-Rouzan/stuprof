import { Hono } from "hono";
import { prisma } from "../db/index.js";
import { authMiddleware, verifyAdmin } from "../middleware/auth.js";

export const historyRoutes = new Hono();

historyRoutes.use("*", authMiddleware, verifyAdmin);

// Get all history records
historyRoutes.get("/", async (c) => {
  const records = await prisma.history.findMany({
    include: {
      student: {
        select: {
          name: true,
          nim: true,
        },
      },
    },
    // Sort by last login
    orderBy: {
      lastLogin: "desc",
    },
  });

  return c.json(records);
});

// Deletes all record history
historyRoutes.delete("/", async (c) => {
  try {
    await prisma.history.deleteMany({});
    return c.json({ message: "All history has been cleared" });
  } catch (err: any) {
    return c.json(
      { message: "Failed to clear history", error: err.message },
      500
    );
  }
});
