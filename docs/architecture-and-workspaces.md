# Arquitectura del Monorepo y Espacios de Trabajo (Workspaces)

Este documento detalla la arquitectura técnica del ecosistema frontend de **Binger**, explicando cómo se gestionan las dependencias compartidas mediante **pnpm Workspaces**, cómo se optimizan las tareas con **Turborepo** y cómo se resuelve el acoplamiento con **Expo / React Native**.

---

## 🏗️ Flujo de Dependencias e Inyección de Código

Para mantener el principio **DRY (Don't Repeat Yourself)**, la lógica que no depende de interfaces visuales (HTML o Componentes Nativos) se extrae a la capa de paquetes. Las aplicaciones consumen estos paquetes como si fuesen librerías externas de npm, pero con enlaces simbólicos (_symlinks_) locales en tiempo real.

```text
       ┌────────────────────────┐
       │     apps/backend       │  ◄── (Repositorio Externo API)
       └───────────┬────────────┘
                   │  HTTP REST / JSON
                   ▼
       ┌────────────────────────┐
       │   packages/shared      │  ◄── Centraliza Axios, Hooks, Zod, Types
       └─────┬────────────┬─────┘
             │            │
   Symlink   │            │   Symlink
   Interno   ▼            ▼   Interno
┌──────────────┐        ┌──────────────┐
│   apps/web   │        │ apps/mobile  │
│   (React)    │        │    (Expo)    │
└──────────────┘        └──────────────┘
```

---

### Paquetes Locales:

1. **`@binger/shared` (`packages/shared`)**: Contiene la instancia global de Axios configurada, los interceptores para inyectar el `Authorization: Bearer <token>`, las funciones de fetching para cada módulo del sistema y las validaciones de esquemas en Zod.
2. **`@binger/ui-config` (`packages/ui-config`)**: Contiene la definición de diseño estricta de Binger (Tokens de color como el fondo Premium Deep Midnight Blue-Black `#0B0C10` y Dark Slate Gray `#1F2833`).

---

## 📦 Configuración de pnpm Workspaces

El archivo `pnpm-workspace.yaml` en la raíz define qué directorios forman parte del ecosistema. pnpm se encarga de aislar las dependencias compartidas y evitar el "Duplicated Node Modules Hell".

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Cuando `apps/web` o `apps/mobile` requieren usar la lógica compartida, se declaran en sus respectivos `package.json` utilizando el protocolo `workspace:`:

```json
"dependencies": {
  "@binger/shared": "workspace:*"
}

```

---

## 📱 El Reto de React Native: Configuración de Metro Bundler

A diferencia de Vite o Webpack (usados en la Web), **Metro (el empaquetador de React Native y Expo)** no sigue los enlaces simbólicos (_symlinks_) de forma nativa por defecto. Para que la aplicación móvil pueda compilar y leer correctamente el paquete `@binger/shared`, debemos configurar el archivo `metro.config.js` en `apps/mobile/`.

### Configuración requerida para `apps/mobile/metro.config.js`:

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// 1. Encontrar la raíz del monorepo
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 2. Obligar a Metro a vigilar la raíz del monorepo (para incluir /packages)
config.watchFolders = [monorepoRoot];

// 3. Indicarle a Metro dónde buscar los node_modules correspondientes
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// 4. Asegurar que resuelva correctamente los symlinks generados por pnpm
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
```

---

## 🚀 Compilación Eficiente con Turborepo

Turborepo gestiona el pipeline de ejecución mediante el archivo `turbo.json`. Esto evita tareas redundantes mediante el uso de caché local y remoto. Si el código de `packages/shared` no ha cambiado, Turborepo no perderá tiempo volviéndolo a compilar.

### Pipeline Base (`turbo.json` en la raíz):

```json
{
  "$schema": "[https://turbo.build/schema.json](https://turbo.build/schema.json)",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- **`dependsOn: ["^build"]`**: Significa que antes de que una aplicación en `apps/` pueda generar su compilación de producción, Turborepo compilará primero de forma obligatoria cualquier dependencia interna que tenga dentro de `packages/`.

---

## 🛠️ Buenas Prácticas de Desarrollo en la Arquitectura

1. **Aislamiento de Entorno**: Nunca importes componentes visuales de React (Web) dentro de `packages/shared`. Este paquete debe ser estrictamente agnóstico a la plataforma (JavaScript/TypeScript puro).
2. **Ciclo de compilación en desarrollo**: Al ejecutar `pnpm dev` en la raíz, Turborepo inicia un proceso en modo _watch_ para `@binger/shared`. Cualquier cambio que guardes en los servicios de Axios se reflejará instantáneamente tanto en el navegador web como en el emulador móvil de Expo sin necesidad de reiniciar los servidores.
