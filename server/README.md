# StuProf Server

## 📌 Description

The backend service and API engine for the student profile system. It handles identity authentication, role-based authorization rules, database operations for student records, and automated audit logging to track all profile changes and administrative data updates.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                      |
| :-------------------------- | :------------------------------------- |
| 🌐 **Programming Language** | `TypeScript`                           |
| 🧩 **Framework**            | `Hono`                                 |
| ⚛️ **Libraries**            | `dotenv`, `Prisma`, `tsx`, `bcrypt.js` |
| 🗄️ **Database**             | `Neon (PostgreSQL)`                    |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).
   - An active [Neon](https://neon.com) account and Database Connection String.

2. **Neon Connection String Setup**
   - Visit the official [Neon website](https://neon.com).
   - Sign up for a new account or log in to your existing account.
   - Once redirected to the dashboard, navigate to the **Projects** menu and click **New Project**.
   - Set your project name, select your desired PostgreSQL version and region, then click **Create**.
   - Once created, click the **Connect** button to view your database connection details.
   - Copy the provided connection string to use during the environment configuration phase.

3. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

4. **Configure Environment Variables**

```bash
cp .env.example .env
```

- Open the `.env` file and configure the following variables

  ```env
  DATABASE_URL="YOUR_DATABASE_URL"
  JWT_SECRET="YOUR_JWT_SECRET"

  ADMIN_USERNAME="YOUR_ADMIN_USERNAME"
  ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD"
  ```

5. **Generate Database Client**

```bash
# Using npm
npx prisma generate

# Using pnpm
pnpm prisma generate
```

6. **Run Database Migration**

```bash
# Using npm
npx prisma migrate dev

# Using pnpm
pnpm prisma migrate dev
```

7. **Run the Admin Seeder**

```bash
# Using npm
npx prisma db seed

# Using pnpm
pnpm prisma db seed
```

8. **Run the Program**

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```
