# NicaTour - API Mock (Backend)

API mock ligera para prototipado del backend de NicaTour. Provee endpoints demo para servicios, autenticación y reservas, ideal para integración rápida con un frontend.

## Contenido del repositorio
- [server.js](server.js) — implementación de la API y rutas principales (`app.get("/", ...)`, [`app.get("/api/services", ...)`](server.js)).
- [package.json](package.json) — scripts y dependencias (ver [`scripts.dev`](package.json)).
- [.env](.env) — variables de entorno (ej. `JWT_SECRET`).
- [sql/schema.sql](sql/schema.sql) — esquema SQL sugerido para producción.
- [pnpm-lock.yaml](pnpm-lock.yaml) — lockfile de dependencias.

## Características
- Endpoints mock:
  - GET `/` — ping de la API (en [server.js](server.js)).
  - POST `/api/auth/login` — login demo (genera JWT) (ver [server.js](server.js)).
  - GET `/api/services` — lista de servicios (usa el arreglo [`services`](server.js)).
  - GET `/api/services/:id` — detalle de servicio (en [server.js](server.js)).
  - POST `/api/checkout` — crear reserva mock (usa [`reservations`](server.js)).
  - GET `/api/reservations` — obtener reservas por usuario (usa [`reservations`](server.js)).
- Datos en memoria: [`services`](server.js), [`reservations`](server.js), [`users`](server.js).

## Requisitos
- Node.js 18+
- pnpm (se recomienda la versión indicada en [package.json](package.json))

## Instalación rápida
1. Instalar dependencias:
```bash
pnpm install
```

2. Copiar o ajustar variables en [.env](.env):
- PORT (opcional)
- JWT_SECRET

3. Ejecutar en modo desarrollo:
```bash
pnpm run dev
```
(usa el script [`scripts.dev`](package.json) que lanza `nodemon server.js`).

## Uso rápido (ejemplo)
Hacer POST a `/api/auth/login` con un JSON cualquiera para recibir un token demo. Consultar `/api/services` para obtener servicios de ejemplo.

## Migración a producción
- Usar el esquema en [sql/schema.sql](sql/schema.sql) para crear tablas reales.
- Reemplazar los arreglos en memoria (`services`, `reservations`, `users` en [server.js](server.js)) por una capa de persistencia (Postgres / ORM).
- Asegurar variables sensibles en entorno: [.env](.env).

## Contribuir
- Abrir PRs pequeñas y descriptivas.
- Mantener endpoints y fixtures simples para integración con el frontend.

## Licencia
Proyecto demo — adaptar según necesidades.
