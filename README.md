# ⚽ ArmaF5

Aplicación full stack para armar equipos de fútbol balanceados, permitiendo gestionar jugadores y generar partidos de forma simple.

---

## 🚀 Tecnologías

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## 🔐 Funcionalidades

- Registro y login de usuarios
- Autenticación con JWT
- Roles: USER, ADMIN, SYSADMIN
- CRUD de jugadores
- Cada usuario gestiona sus propios jugadores
- Admin puede ver todos los jugadores
- Sistema preparado para armado de equipos balanceados

---

## 🧠 Arquitectura

- Frontend desacoplado del backend
- API REST
- Middleware de autenticación
- Manejo de roles y permisos
- Persistencia con Prisma + PostgreSQL

---

## ⚙️ Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/armaf5.git
cd armaf5
```

---

### 2. Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
JWT_SECRET=tu_secreto
```

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

Correr servidor:

```bash
npm run dev
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Notas

- El primer usuario puede ser promovido manualmente a SYSADMIN desde la base de datos
- El sistema está preparado para escalar con más funcionalidades (equipos automáticos, estadísticas, etc.)


## 👨‍💻 Autor

Desarrollado por Danilo Mercado
