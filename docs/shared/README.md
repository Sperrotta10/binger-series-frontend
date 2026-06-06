# Binger Shared Core Core (`@binger/shared`)

Este paquete actúa como la **capa de lógica centralizada y agnóstica** de todo el ecosistema frontend de Binger. Su objetivo principal es asegurar el principio **DRY (Don't Repeat Yourself)**, empaquetando la comunicación HTTP, los tipados estrictos de TypeScript y los esquemas de validación en un solo lugar compartido.

Tanto la aplicación Web (React) como la aplicación Móvil (React Native / Expo) consumen este paquete de forma local a través de _symlinks_ gestionados por `pnpm workspaces`.

---

## 🚫 Regla de Oro Arquitectónica (Agnosticismo Puro)

Este paquete es **TypeScript puro**. Queda **estrictamente prohibido** importar:

1. Componentes de React Web (etiquetas HTML, `div`, `span`, etc.) o dependencias de entornos web (como `react-router-on-the-browser`).
2. Componentes o librerías nativas de dispositivos móviles (como `react-native`, `expo-secure-store`, etc.).

Si una lógica necesita renderizar interfaces visuales o acceder a hardware nativo, debe quedarse dentro de la app correspondiente (`apps/web` o `apps/mobile`).

---

## 📂 Estructura Interna del Paquete

El código fuente se organiza de forma modular, reflejando fielmente las capacidades de nuestra API:

```text
packages/shared/
├── src/
│   ├── api/           # Clientes HTTP (Instancia de Axios e interceptores de tokens)
│   ├── services/      # Funciones de fetching por módulo (auth, catalog, lists, activity, social)
│   ├── schemas/       # Esquemas de validación Zod (espejo del backend)
│   ├── types/         # Interfaces e inferencias de tipos de TypeScript globales
│   └── index.ts       # Punto de exportación único (Public API)
├── package.json       # Configuración del empaque local
└── tsconfig.json      # Configuración de TypeScript para compilación estricta

```

---

## 🔄 Flujo para Agregar una Nueva Funcionalidad (Ejemplo: Módulo de Listas)

Cuando crees o modifiques un endpoint en el backend y quieras consumirlo en el frontend, sigue este orden estricto dentro de este paquete:

### 1. Definir el esquema y tipo (`src/schemas/` o `src/types/`)

Crea la validación con Zod para asegurar que los datos del formulario cumplan con las reglas:

```typescript
// src/schemas/list.schema.ts
import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().max(200).optional(),
});

export type CreateListInput = z.infer<typeof createListSchema>;
```

### 2. Crear el servicio de fetching (`src/services/`)

Utiliza el cliente global de Axios (`apiClient`) para pegarle a las rutas reales de la API:

```typescript
// src/services/lists.service.ts
import { apiClient } from "../api/client";
import { CreateListInput } from "../schemas/list.schema.ts";

export const listsService = {
  create: async (data: CreateListInput) => {
    const response = await apiClient.post("/activity/lists", data);
    return response.data;
  },
  getById: async (listId: string) => {
    const response = await apiClient.get(`/activity/lists/${listId}`);
    return response.data;
  },
};
```

### 3. Exportarlo en el índice principal (`src/index.ts`)

Para que las aplicaciones puedan leerlo, debes exponerlo en la puerta de salida del paquete:

```typescript
// src/index.ts
export * from "./schemas/list.schema";
export * from "./services/lists.service";
```

---

## ⚡ Interceptores y Gestión de Sesión (JWT)

El cliente de Axios configurado en `src/api/client.ts` incluye un **interceptor de peticiones**.

Cada vez que ejecutas una función desde la Web o el Móvil, el cliente compartido intercepta la llamada e inyecta automáticamente el token de autenticación en las cabeceras si el usuario ha iniciado sesión:

```text
App (Dispara llamada) ➔ Interceptor Shared (Inyecta Bearer Token) ➔ Backend Node.js (Valida)

```

_(Nota: Como el almacenamiento del token es nativo en celular [SecureStore] y de navegador en web [LocalStorage], las apps le deben proveer el token al cliente compartido mediante una función helper de inicialización)._

---

## 🛠️ Comandos Útiles

Si necesitas probar que los tipos compilen correctamente de forma aislada, puedes correr desde la raíz:

- Compilar paquete: `pnpm --filter @binger/shared build`
- Analizar código: `pnpm --filter @binger/shared lint`

## 🎨 Contrato del Sistema de Diseño (Design System Tokens)

Para asegurar el look **Futuristic Cinematic (Midnight Kinetic)**, toda la configuración visual en código debe respetar estrictamente el archivo de especificación de Stitch. Los desarrolladores e IA deben mapear los componentes a estos tokens exactos:

- **Paleta Base:** Fondo principal en `background` (`#121317`), contenedores en `surface` (`#121317`) y capas elevadas con efecto Glassmorphism usando `surface-container` (`#1F1F24`).
- **Acentos Lumínicos:** Acciones principales y progreso con `primary` (Vivid Violet: `#DCB8FF`), contrastes técnicos y visualización de datos con `secondary` (Cyan Neon: `#00FBFB`).
- **Tipografía Estricta:** Títulos principales y de impacto con **Sora**. Textos funcionales, descripciones y metadatos con **Hanken Grotesk**.
