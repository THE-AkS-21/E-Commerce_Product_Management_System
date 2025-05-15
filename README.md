# 🛒 E-Commerce Product Management System

A robust **Product Management System** built using **ASP.NET Core 8** for the backend and **React 18 + Vite + Tailwind CSS** for the frontend, with **PostgreSQL** as the database.  
This system allows admins and business users to manage product listings, categories, inventory, etc, efficiently.

---

## 📑 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Packages & Dependencies](#packages--dependencies)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Author](#Author)

---

## 📖 About

This project aims to provide a clean, scalable, and modular architecture for product management within an e-commerce environment. The system offers APIs for product CRUD operations, search, filtering, and frontend features for listing and managing products visually.

---

## 🚀 Key Features

✅ Clean, maintainable **ASP.NET Core 8 backend** with direct PostgreSQL access (no ORM)  
✅ Fully responsive **React 18 frontend** styled with **Tailwind CSS**  
✅ **Product search** by name  
✅ **Filter products** by category  
✅ View **product details**  
✅ Add, update, and delete products from the admin panel  
✅ Clean, stateless **RESTful APIs**  
✅ **Dockerized full-stack deployment**  
✅ Modern frontend built with **Vite** for blazing-fast development

---

## 🛠️ Tech Stack

- **Backend:** ASP.NET Core 8 Web API, Npgsql, C#
- **Frontend:** React 18, Vite, Tailwind CSS
- **Database:** PostgreSQL
- **Containerization:** Docker
- **API Testing:** Postman

---

## 📦 Packages & Dependencies

### 📌 Backend

|                         Package                                  |                                 Description                                                           |
|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `Npgsql`                                                         | PostgreSQL driver for .NET, used for direct SQL queries without ORM                                   |
| `Microsoft.Extensions.Configuration`                             | Manages application settings and connection strings                                                   |
| `Microsoft.AspNetCore.Mvc`                                       | Framework for building REST APIs                                                                      |
| `System.Threading.Tasks`                                         | Supports asynchronous programming with `async/await`                                                  |
| `Microsoft.AspNetCore.Authentication.JwtBearer-version 8.0.4`    | Provides middleware to support JWT (JSON Web Token) authentication in ASP.NET Core applications.      |
| `BCrypt.Net-Next`                                                | A popular password hashing library for .NET. It’s used to securely hash and verify passwords using    | |                                                                  | the BCrypt algorithm, ensuring that user passwords are safely stored in the database.                 |
| `Swashbuckle.AspNetCore`                                         | Automatically generates Swagger/OpenAPI documentation for your ASP.NET Core APIs.                     |

---

### 📌 Frontend

|                         Package                                  |                                 Description                                                           |
|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `react`                                                          | Core React library                                                                                    |
| `react-dom`                                                      | DOM-specific methods for React                                                                        |
| `vite`                                                           | Fast, modern frontend build tool                                                                      |
| `tailwindcss`                                                    | Utility-first CSS framework                                                                           |
| `@tailwindcss/vite`                                              | Integrates Tailwind with Vite                                                                         |
| `vite-tsconfig-paths`                                            | Supports TypeScript path aliases in Vite                                                              |
| `@react-router/dev`                                              | React Router for SPA navigation                                                                       |
| `axios`                                                          | Used for API calls                                                                                    |
| `@syncfusion/` (optional)                                        | UI components (if used for grids or charts)                                                           |


---


### 🗂️ Create Directory Structure
```
mkdir E-Commerce_Product_Management_System
cd E-Commerce_Product_Management_System
mkdir backend frontend

//Backend structure:

cd backend
dotnet new webapi -o src

//Frontend structure

cd frontend
npm create vite@latest app -- --template react-ts
cd app
npm install

```
### 📦 Dependencies Install Commands
```
//BACKEND

//Nqsql
dotnet add package Npgsql

//JWT AUTHENTICATION
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.4

//FOR PASSWORD ENCRYPTION
dotnet add package BCrypt.Net-Next

//FOR SWAGGER DOCUMENTATION/open APIs
dotnet add package Swashbuckle.AspNetCore

//FRONTEND

npm install react react-dom vite tailwindcss @tailwindcss/vite vite-tsconfig-paths @react-router/dev axios

//Optional for UI Components
npm install @syncfusion/ej2-react-grids

```

---

## 📁 Project Structure

```Bash
E-Commerce_Product_Management_System/
├── backend/
|   ├── src/
│   |    ├── Controllers/
│   |    ├── Models/
│   |    ├── Repositories/
│   |    ├── Services/
|   |    └── Program.cs
│   ├── Dockerfile
│   └── appsettings.json
├── frontend/
│   ├── app/
│   │   ├── pages/
│   │   ├── app.css
│   │   ├── main.tsx
│   │   └── vite.config.ts
|   ├── components/
│   └── Dockerfile
├── docker-compose.yml
└── docker-compose.deploy.yml

```

---

## 🖥️ Screenshot

**LOG IN PAGE**

<img width="1680" alt="log-in_Page" src="https://github.com/user-attachments/assets/dfdc8db9-c7d9-40bf-a9b6-427d59f1f589" />

**Register Page**

<img width="1680" alt="Register_Page" src="https://github.com/user-attachments/assets/8ea4bc3e-e239-429e-8585-d573defebadf" />

**Customer_Page**

<img width="1680" alt="Customer_Page" src="https://github.com/user-attachments/assets/dfc2c891-1652-4356-b3d2-29f9915a1674" />

**ADMIN DASHBOARD**

<img width="1680" alt="Admin_Dashboard" src="https://github.com/user-attachments/assets/db0110f9-8405-4436-92c2-992a23b9511c" />

**ALL PRODUCTS**

<img width="1680" alt="All_Products" src="https://github.com/user-attachments/assets/9aa7551b-6544-4d2e-b5c5-f89b1232f5fd" />

<img width="1680" alt="All_Products_Card_View" src="https://github.com/user-attachments/assets/8a1eac69-c001-4522-ab09-26262f15660a" />

**PRODUCT DETAILS**

<img width="1680" alt="Product_Details" src="https://github.com/user-attachments/assets/c9dec7fb-887d-4f56-b18b-4bdbfa1307c7" />

**CREATE PRODUCT**

<img width="1680" alt="Create_Product" src="https://github.com/user-attachments/assets/400a8dc1-cc0c-44e7-af39-c5239395c492" />

**UPDATE PRODUCT**

<img width="1680" alt="Update_Product" src="https://github.com/user-attachments/assets/b95d168a-6268-4b56-9239-a23871fb56a2" />

**ALL CATEGORIES**

<img width="1680" alt="All_Categories" src="https://github.com/user-attachments/assets/4543b9a2-0cd8-47f7-9a4e-68e58e763a39" />

**CREATE CATEGORY**

<img width="1680" alt="Add_Category" src="https://github.com/user-attachments/assets/26b6243d-d529-4243-91ae-6fd05742b353" />

---
## 🐳 Docker Setup

### 📋 Prerequisites

- Install Docker Desktop or any Container Orchestration Tool
- Make Sure Port: 3000, 8080, & 5433 are free

### 📌 Build & Run Containers

```shell
//Cammand to pull and deploy in your docker environment
docker-compose -f docker-compose.deploy.yml up -d
```

---

📌 Author
Ankit Kumar Singh
