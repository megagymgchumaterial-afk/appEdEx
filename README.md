This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



---

# 3) `src/README.md`

```md
# Estructura de `src`

Esta carpeta contiene el código principal de la aplicación.

La arquitectura está organizada para separar:
- rutas y composición de páginas
- lógica de pantalla / features
- dominio del producto
- branding configurable
- persistencia concreta
- piezas compartidas reutilizables

---

# Mapa general de carpetas

## `app/`
Rutas y layouts del App Router.

### Responsabilidad
- `page.tsx`
- `layout.tsx`
- composición de pantallas
- lectura de parámetros de ruta

### No debería contener
- lógica compleja de dominio
- acceso directo a storage
- modelos centrales del producto

---

## `branding/`
Branding visible y configurable de la app.

### Incluye
- labels visibles
- nombres configurables
- defaults de branding
- hooks/helpers para resolver branding

---

## `domain/`
Núcleo del negocio de la aplicación.

### Módulos esperados
- `persona`
- `rutina`
- `entrenamiento`
- `progreso`

### Incluye
- tipos de dominio
- servicios
- contratos de repositorio
- mappers si hacen falta

---

## `features/`
Lógica de pantalla y módulos funcionales de UI.

### Ejemplos
- constructor de rutina
- dashboard del editor
- vista de entrenamiento del executor
- formulario de persona

---

## `shared/`
Piezas reutilizables y neutrales.

### Incluye
- UI genérica
- hooks compartidos
- utils
- constantes
- tipos genéricos

---

## `infrastructure/`
Implementaciones concretas de persistencia o integraciones.

### Estado inicial esperado
- storage local para personas, rutinas, progreso y entrenamiento si corresponde

---

# Idea general del flujo de dependencias

## `app`
usa:
- `features`
- `shared`
- `branding`

## `features`
usa:
- `domain`
- `shared`
- `branding`

## `domain`
define el negocio central y debería mantenerse desacoplado de `app` y `features`

## `infrastructure`
implementa persistencia concreta usando los contratos o shapes del dominio

---

# Estado actual del refactor
Este repo está siendo reconstruido desde una base legacy con una arquitectura nueva.

## Objetivos del refactor
- separar editor y executor sin mezclar conceptos
- modelar bien rutina / sesión / progreso
- evitar hardcodear branding
- reducir acoplamiento entre UI, storage y dominio
- facilitar escalabilidad futura