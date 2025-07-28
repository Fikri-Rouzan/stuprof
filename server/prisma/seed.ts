import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error(
      "❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file"
    );
  }

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin user already exists. Seeding skipped.");
    return;
  }

  // If there isn't one yet, create a new admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.create({
    data: {
      username: adminUsername,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log("Seeding finished. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
