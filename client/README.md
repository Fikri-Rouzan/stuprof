# StuProf Client

## 📌 Description

The user interface component of the student profile application, providing dedicated dashboards for both students and administrators. It features interactive profile editing tools for students, alongside comprehensive administrative management panels for browsing, filtering, updating student records, and reviewing change history logs.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                                                     |
| :-------------------------- | :-------------------------------------------------------------------- |
| 🌐 **Programming Language** | `TypeScript`                                                          |
| 🧩 **Framework**            | `Tailwind CSS`                                                        |
| ⚛️ **Libraries**            | `React`, `Axios`, `React Router`, `MUI`, `SweetAlert2`, `React Icons` |
| ⚡ **Tool**                 | `Vite`                                                                |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).
   - A running API Server instance and its base URL.

2. **API Server URL Setup**
   - Launch and run your backend API server component.
   - Copy the generated base server URL provided in the terminal output or service dashboard.
   - Save this URL to use during the environment configuration phase.

3. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

4. **Configure Environment Variable**

```bash
cp .env.example .env
```

- Open the `.env` file and configure the following variable

  ```env
  VITE_API_URL="YOUR_API_URL/api"
  ```

5. **Run the Program**

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```
