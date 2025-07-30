import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { prisma } from "../db/index.js";
import {
  authMiddleware,
  verifyAdmin,
  verifyStudent,
  type JWTPayload,
} from "../middleware/auth.js";

type Env = {
  Bindings: {
    JWT_SECRET: string;
  };
};

export const studentRoutes = new Hono<Env>();

const studentPublicSelect = {
  id: true,
  nim: true,
  name: true,
  dob: true,
  phone: true,
  address: true,
  hobby: true,
  createdAt: true,
  updatedAt: true,
};

// Middleware for student routes
const meRoutes = studentRoutes.use("/me", authMiddleware, verifyStudent);

// Student: Get student profiles
meRoutes.get("/me", async (c) => {
  const payload = c.get("jwtPayload") as JWTPayload;
  const student = await prisma.student.findUnique({
    where: { id: payload.id },
    select: studentPublicSelect,
  });

  if (!student) {
    return c.json({ message: "Student not found" }, 404);
  }
  return c.json(student);
});

// Student: Updating student profiles
meRoutes.put("/me", async (c) => {
  try {
    const payload = c.get("jwtPayload") as JWTPayload;
    const body = await c.req.json();

    const dataToUpdate: {
      name?: string;
      dob?: Date;
      phone?: string;
      address?: string;
      hobby?: string;
      password?: string;
    } = {};

    if (body.name) dataToUpdate.name = body.name;
    if (body.dob) dataToUpdate.dob = new Date(body.dob);
    if (body.phone) dataToUpdate.phone = body.phone;
    if (body.address) dataToUpdate.address = body.address;
    if (body.hobby) dataToUpdate.hobby = body.hobby;

    if (body.password) {
      dataToUpdate.password = await bcrypt.hash(body.password, 10);
    }

    const updatedStudent = await prisma.student.update({
      where: { id: payload.id },
      data: dataToUpdate,
      select: studentPublicSelect,
    });

    return c.json(updatedStudent);
  } catch (err: any) {
    console.error("update profile error", err);
    return c.json(
      { message: "Failed to update profile", error: err.message },
      500
    );
  }
});

// Middleware for admin routes
const adminRoutes = studentRoutes.use("/*", authMiddleware, verifyAdmin);

// Admin: Get all student data
adminRoutes.get("/", async (c) => {
  const students = await prisma.student.findMany({
    select: studentPublicSelect,
  });
  return c.json(students);
});

// Admin: Create a new student
adminRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const existingStudent = await prisma.student.findUnique({
      where: { nim: body.nim },
    });
    if (existingStudent) {
      return c.json({ message: "NIM already exists" }, 400);
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newStudent = await prisma.student.create({
      data: { ...body, password: hashedPassword, dob: new Date(body.dob) },
      select: studentPublicSelect,
    });
    return c.json(newStudent, 201);
  } catch (err: any) {
    return c.json(
      { message: "Failed to create student", error: err.message },
      500
    );
  }
});

// Admin: Gets details of one student
adminRoutes.get("/:id", async (c) => {
  const { id } = c.req.param();
  const student = await prisma.student.findUnique({
    where: { id },
    select: studentPublicSelect,
  });

  if (!student) {
    return c.json({ message: "Student not found" }, 404);
  }
  return c.json(student);
});

// Admin: Updating student data
adminRoutes.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();

    const dataToUpdate: {
      nim?: string;
      name?: string;
      dob?: Date;
      phone?: string;
      address?: string;
      hobby?: string;
      password?: string;
    } = {};

    if (body.nim) dataToUpdate.nim = body.nim;
    if (body.name) dataToUpdate.name = body.name;
    if (body.dob) dataToUpdate.dob = new Date(body.dob);
    if (body.phone) dataToUpdate.phone = body.phone;
    if (body.address) dataToUpdate.address = body.address;
    if (body.hobby) dataToUpdate.hobby = body.hobby;

    if (body.password) {
      dataToUpdate.password = await bcrypt.hash(body.password, 10);
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: dataToUpdate,
      select: studentPublicSelect,
    });

    return c.json(updatedStudent);
  } catch (err: any) {
    console.error("Admin update student error", err);
    return c.json(
      { message: "Student not found or failed to update", error: err.message },
      500
    );
  }
});

// Admin: Deleting student data
adminRoutes.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await prisma.student.delete({
      where: { id },
    });
    return c.json({ message: "Student deleted successfully" });
  } catch (err: any) {
    return c.json(
      { message: "Student not found or failed to delete", error: err.message },
      500
    );
  }
});
