# Binger Client Ecosystem (Monorepo)

¡Bienvenido al ecosistema frontend de **Binger**! Este repositorio está estructurado como un **Monorepo** utilizando **pnpm Workspaces** y **Turborepo**. Aquí coexisten tanto la plataforma web (React) como la aplicación móvil (React Native / Expo), compartiendo de forma nativa la lógica de negocio, clientes de API, tipos de TypeScript y esquemas de validación.

> 💡 **Nota de Arquitectura:** El backend de este proyecto se gestiona y despliega de forma totalmente independiente desde otro repositorio de código.

---

## 🏛️ Estructura del Proyecto

El monorepo está dividido en dos secciones principales utilizando el estándar de la industria:

```text
binger-frontend-monorepo/
├── apps/
│   ├── web/           # Aplicación Web (React.js + Vite/Next.js)
│   └── mobile/        # Aplicación Móvil (React Native + Expo)
├── packages/
│   ├── shared/        # Lógica de negocio reutilizable (API client, Hooks, Zod, TS Types)
│   └── ui-config/     # (Opcional) Design System tokens: Paleta de colores premium y tipografías
├── turbo.json         # Configuración de pipelines de Turborepo
├── pnpm-workspace.yaml# Definición de espacios de trabajo de pnpm
└── package.json       # Configuración global y scripts raíz
```

---

## 🚀 Instalación y Ejecución

Este proyecto utiliza **pnpm** como gestor de paquetes principal.

### 1. Instalación de Dependencias

```bash
# Instala todas las dependencias del monorepo
pnpm install

# Opcional: Si necesitas turbopack (más rápido que webpack)
pnpm run setup:turbopack
```

### 2. Ejecución Local

Puedes ejecutar comandos en todas las aplicaciones a la vez o de forma individual.

**Opción A: Ejecutar en todas las apps (Web y Móvil)**

```bash
# Inicia ambos proyectos simultáneamente
pnpm run dev

# Ejecuta solo los builds
pnpm run build:all
```

**Opción B: Ejecutar una app específica**

```bash
# Iniciar Web
pnpm --filter @binger/web dev

# Iniciar Móvil (Android o iOS dependiendo de tu config)
pnpm --filter @binger/mobile dev
```

---

## 🏗️ Arquitectura de Paquetes

### 📦 `packages/shared`

Este es el núcleo de nuestro código reutilizable. Evita la duplicación y garantiza consistencia total entre la web y el móvil.

Contiene:

- **`src/api/`**: Cliente HTTP genérico y configuración de Axios.
- **`src/types/`**: Definiciones de interfaces y enums (TypeScript).
- **`src/schemas/`**: Esquemas de validación Zod.
- **`src/hooks/`**: Custom hooks React (ej. `useAuth`).
- **`src/utils/`**: Funciones de utilidad.

### 🎨 `packages/ui-config` (Opcional)

Centraliza las reglas de diseño para que ambas aplicaciones tengan la misma identidad visual sin copiar CSS o estilos.

---

## 🛠️ Configuración de Desarrollo

### Web (`apps/web`)

- **Stack**: React 19 + Vite (o Next.js según el branch).
- **Estilos**: CSS Modules o Tailwind (configurado en `vite.config.ts`).
- **Enrutador**: React Router DOM.

### Móvil (`apps/mobile`)

- **Stack**: React Native + Expo (Expo Go).
- **Estilos**: Estilos nativos + Styled Components (o NativeWind).
- **Navegación**: React Navigation.

---

## ⚡ Turborepo y Caching

Turborepo optimiza la velocidad de desarrollo y build.

- **Cache Inteligente**: Solo vuelve a ejecutar tareas si el código fuente o la configuración han cambiado.
- **Task Graph**: Entiende las dependencias entre paquetes y ejecuta en paralelo cuando es posible.

---

## 📝 Convenios y Buenas Prácticas

1. **Tipos Compartidos**: Si creas un nuevo modelo de datos, créalo primero en `packages/shared/src/types`.
2. **Consistencia**: Ambas aplicaciones deben usar las mismas constantes de API y esquemas de validación.
3. **Feature-Based**: Para nuevas funcionalidades, crea un nuevo branch y abre un PR.

## 📑 Documentación Adicional

Para más detalles sobre flujos específicos, consulta las guías dedicadas:

- Configuración de Workspaces y Metro (Móvil)
- Flujo de Trabajo Git y Commits
- Manual de Desarrollo Web
- Manual de Desarrollo Móvil
