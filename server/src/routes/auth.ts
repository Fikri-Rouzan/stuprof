import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "../db/index.js";
import { authMiddleware, type JWTPayload } from "../middleware/auth.js";

type Env = {
  Bindings: {
    JWT_SECRET: string;
  };
};

export const authRoutes = new Hono<Env>();

// Student Registration
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
    const student = await prisma.student.create({
      data: {
        ...body,
        password: hashedPassword,
        dob: new Date(body.dob),
      },
    });

    // Create JWT token
    const payload: Omit<JWTPayload, "exp"> = {
      id: student.id,
      role: "student",
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.json({ token }, 201);
  } catch (err: any) {
    return c.json({ message: "Failed to register", error: err.message }, 500);
  }
});

// Student login
authRoutes.post("/student/login", async (c) => {
  try {
    const { nim, password } = await c.req.json();
    const student = await prisma.student.findUnique({ where: { nim } });

    if (!student) {
      return c.json({ message: "Invalid credentials" }, 400);
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return c.json({ message: "Invalid credentials" }, 400);
    }

    // update or create login history record
    await prisma.history.upsert({
      where: { studentId: student.id },
      update: { lastLogin: new Date() },
      create: { studentId: student.id, lastLogin: new Date() },
    });

    const payload: Omit<JWTPayload, "exp"> = {
      id: student.id,
      role: "student",
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.json({ token });
  } catch (err: any) {
    return c.json({ message: "Failed to login", error: err.message }, 500);
  }
});

// Student logout
authRoutes.post("/logout", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload") as JWTPayload;

  if (payload.role === "student") {
    // update logout time
    await prisma.history.update({
      where: { studentId: payload.id },
      data: { lastLogout: new Date() },
    });
  }

  return c.json({ message: "Logged out successfully" });
});

// Admin login
authRoutes.post("/admin/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return c.json({ message: "Invalid credentials" }, 400);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return c.json({ message: "Invalid credentials" }, 400);
    }

    const payload: Omit<JWTPayload, "exp"> = { id: admin.id, role: "admin" };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.json({ token });
  } catch (err: any) {
    return c.json({ message: "Failed to login", error: err.message }, 500);
  }
});
