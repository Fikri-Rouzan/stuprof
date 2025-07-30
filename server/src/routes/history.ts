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

// Delete history records by ID
historyRoutes.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await prisma.history.delete({
      where: { id },
    });
    return c.json({ message: "History record deleted successfully" });
  } catch (err: any) {
    return c.json(
      { message: "Failed to delete history record", error: err.message },
      500
    );
  }
});
