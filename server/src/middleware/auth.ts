import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

export type JWTPayload = {
  id: string;
  role: "admin" | "student";
  exp: number;
};

// JWT token
export const authMiddleware = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  });
  return jwtMiddleware(c, next);
});

// Admin role
export const verifyAdmin = createMiddleware(async (c, next) => {
  const payload = c.get("jwtPayload") as JWTPayload;
  if (payload.role !== "admin") {
    return c.json({ message: "Admin role required" }, 403);
  }
  await next();
});

// Student role
export const verifyStudent = createMiddleware(async (c, next) => {
  const payload = c.get("jwtPayload") as JWTPayload;
  if (payload.role !== "student") {
    return c.json({ message: "Student role required" }, 403);
  }
  await next();
});
