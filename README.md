# StuProf

## 📌 Description

A comprehensive full-stack student profile management system designed to streamline record-keeping and communication between students and academic administrators. The platform features secure role-based access control, allowing students to manage their personal profiles while empowering administrators to review, edit, search, and track historical audit logs of student data modifications across the institution.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                                                                                                |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| 🌐 **Programming Language** | `TypeScript`                                                                                                     |
| 🧩 **Frameworks**           | `Hono`, `Tailwind CSS`                                                                                           |
| ⚛️ **Libraries**            | `dotenv`, `Prisma`, `tsx`, `bcrypt.js`, `React`, `Axios`, `React Router`,<br>`MUI`, `SweetAlert2`, `React Icons` |
| 🗄️ **Database**             | `Neon (PostgreSQL)`                                                                                              |
| ⚡ **Tool**                 | `Vite`                                                                                                           |

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

3. **Clone the Repository**

```bash
git clone https://github.com/Fikri-Rouzan/stuprof.git
cd stuprof
```

4. **Navigate to Both Directories**

   Navigate to the `server` directory

   ```bash
   cd server
   ```

   Navigate to the `client` directory

   ```bash
   cd client
   ```

5. **Check `README.md` in Both Directories**

   Each directory contains its own `README.md` file with specific setup instructions for the server and client components. Please refer to these files for detailed guidance on configuring and running each part of the application.
   - [View README for server](./server/README.md)
   - [View README for client](./client/README.md)
