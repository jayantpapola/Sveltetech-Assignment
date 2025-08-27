# React + Redux Toolkit + Tailwind (JavaScript)

This project implements the assignment using **React (JS)**, **TailwindCSS**, and **Redux Toolkit**.

# Features:
- Mock Authentication (admin@example.com / admin123) with encrypted Cookies.
- Protected routes (redirect to /login).
- Sidebar + Header + Main layout.
- Dashboard Page - Showing analytics with dummy data only
- Users page: fetch from JSONPlaceholder, search, filter, pagination, edit modal (mock update). Uses Redux for Global state managment and thunk for fetching users.
- Settings: dark mode + notification preferences persisted in Redux + localStorage (encrypted).
- Toast notifications via react-hot-toast.

# Optimisation:
- Code Splitting by using lazy and suspense
- Used hooks like useMemo and useCallback
- Reusable components

# Secure
- used js-cookies to save auth token
- Protected Route


## How to Run
1. Node 20
2. npm install
3. npm run dev
   Open http://localhost:3000
