import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "../db/index.js";
import { authMiddleware, type JWTPayload } from "../middleware/auth.js";

type Env = { Bindings: {} };

export const authRoutes = new Hono<Env>();

// Registration route
authRoutes.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    // Check if NIM has been registered
    const existingStudent = await prisma.student.findUnique({
      where: { nim: body.nim },
    });
    if (existingStudent) {
      return c.json({ message: "NIM already registered" }, 400);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create a new student
    await prisma.student.create({
      data: { ...body, password: hashedPassword, dob: new Date(body.dob) },
    });

    return c.json({ message: "Student registered successfully" }, 201);
  } catch (err: any) {
    return c.json({ message: "Failed to register", error: err.message }, 500);
  }
});

// Login route
authRoutes.post("/login", async (c) => {
  try {
    const { credential, password } = await c.req.json();
    if (!credential || !password) {
      return c.json({ message: "Credential and password are required" }, 400);
    }

    const admin = await prisma.admin.findUnique({
      where: { username: credential },
    });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const payload: Omit<JWTPayload, "exp"> = {
          id: admin.id,
          role: "admin",
        };
        const token = await sign(payload, process.env.JWT_SECRET!);
        return c.json({ token, role: "admin", user: { name: admin.username } });
      }
    }

    const student = await prisma.student.findUnique({
      where: { nim: credential },
    });
    if (student) {
      const isMatch = await bcrypt.compare(password, student.password);
      if (isMatch) {
        await prisma.history.upsert({
          where: { studentId: student.id },
          update: { lastLogin: new Date() },
          create: { studentId: student.id, lastLogin: new Date() },
        });
        const payload: Omit<JWTPayload, "exp"> = {
          id: student.id,
          role: "student",
        };
        const token = await sign(payload, process.env.JWT_SECRET!);
        return c.json({ token, role: "student", user: { name: student.name } });
      }
    }

    return c.json({ message: "Invalid credentials" }, 401);
  } catch (err: any) {
    console.error("Endpoint login crash", err);
    return c.json(
      { message: "Login failed due to server error", error: err.message },
      500
    );
  }
});

// Logout route
authRoutes.post("/logout", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload") as JWTPayload;
  if (payload.role === "student") {
    await prisma.history.update({
      where: { studentId: payload.id },
      data: { lastLogout: new Date() },
    });
  }
  return c.json({ message: "Logged out successfully" });
});
