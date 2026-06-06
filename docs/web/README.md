# Binger Web App (React.js + Vite)

Esta es la aplicación web oficial de **Binger**, construida con **React**, **TypeScript**, y **Vite** como empaquetador ultrarrápido para el entorno de desarrollo. La plataforma web está diseñada para ofrecer una experiencia cinemática premium en pantallas de escritorio, optimizando el descubrimiento, tracking y curación de series televisivas.

> 🔗 **Dependencia Clave:** Esta aplicación no realiza peticiones directas al backend por su cuenta; consume de forma obligatoria el cliente de API y los tipos de TypeScript exportados por el paquete local `@binger/shared`.

---

## 🚀 Comandos de Desarrollo

Aunque puedes controlar todo el ecosistema desde la raíz del monorepo, si deseas trabajar exclusivamente dentro de la aplicación web, sitúate en esta carpeta (`cd apps/web`) y utiliza los siguientes comandos con `pnpm`:

| Comando        | Descripción                                                                                            |
| :------------- | :----------------------------------------------------------------------------------------------------- |
| `pnpm dev`     | Levanta el servidor local de Vite (por defecto en `http://localhost:5173`).                            |
| `pnpm build`   | Compila la aplicación y genera los archivos estáticos de producción optimizados en la carpeta `/dist`. |
| `pnpm preview` | Levanta un servidor local para previsualizar el build de producción generado.                          |
| `pnpm lint`    | Ejecuta ESLint para verificar la calidad del código y el formato en la aplicación web.                 |

---

## ⚙️ Variables de Entorno (`.env`)

Vite requiere que las variables de entorno destinadas al cliente comiencen estrictamente con el prefijo `VITE_`.

Crea un archivo llamado `.env.local` en la raíz de esta carpeta (`apps/web/`) para configurar la conexión con el servidor del backend:

```env
# URL de la API del Backend (Apunta a tu repositorio del servidor)
VITE_API_URL=http://localhost:5000/api/v1
```

_Nota: Asegúrate de que tu backend tenga los CORS configurados para permitir peticiones desde el puerto de Vite (`http://localhost:5173`)._

---

## 📂 Estructura de Carpetas Sugerida

Para mantener una interfaz limpia y modular, el código fuente dentro de `src/` se organiza de la siguiente manera:

```text
src/
├── assets/          # Imágenes globales, logos vectoriales (SVG) y fuentes
├── components/      # Componentes UI reutilizables y atómicos (Botones, Modales, Cards)
├── context/         # Contextos globales exclusivos de la Web (ej. UI Theme, Navbar state)
├── hooks/           # Custom hooks exclusivos para el comportamiento del navegador
├── layouts/         # Plantillas de estructura de página (MainLayout, AuthLayout)
├── pages/           # Vistas principales mapeadas por el enrutador (Home, Diary, ListDetail)
├── routes/          # Configuración del enrutador web (React Router)
├── styles/          # Estilos globales y configuración de CSS (Tailwind / CSS Modules)
├── main.tsx         # Punto de entrada de la aplicación
└── App.tsx          # Componente raíz con los proveedores globales

```

---

## 🎨 Configuración de Estilos y Tailwind CSS (Midnight Kinetic)

La interfaz web aprovecha el espacio de pantalla de escritorio para proyectar una estética de **"Centro de Comando"** cinemático. La configuración de Tailwind CSS (`tailwind.config.js`) mapeará los tokens de Stitch:

### 🧩 Tokens de Color en Web

- **Canvas de Fondo:** `bg-background` (`#121317`) — profundidad absoluta sin llegar al negro puro.
- **Componentes Core:**
  - Botones Primarios: `bg-primary-container` (`#8A2BE2`) con texto en blanco. Al hacer hover, se añade un filtro de resplandor (`shadow-[0_0_15px_#8A2BE2]`).
  - Botones Secundarios: `border border-secondary text-secondary` (`#00FBFB`).
- **Efecto Glassmorphism:** Los paneles usan `bg-[rgba(31,31,36,0.7)]` junto con la clase `backdrop-blur-[12px]` y bordes sutiles `border-white/10`.

### 📐 Tipografía y Espaciado Desktop

- **Encabezados:** Tipografía `font-sora` con tracking ajustado (`tracking-tight`).
- **Metadatos (Genre, Year, Runtime):** Tipografía `font-hanken` en mayúsculas (`uppercase tracking-wider`) simulando terminales de datos.
- **Ritmo Vertical:** Margen de escritorio estricto de `64px` (`spacing.margin-desktop`). Separación entre secciones mayores (ej. "Continuar Viendo" vs "Recomendados") fijada en `lg` (48px) o `xl` (80px).
- **Bordes de Tarjetas:** Radio constante de `rounded-md` (4px o 0.25rem) para un look arquitectónico y maquinado.

---

## 🔄 Conexión con la Lógica Compartida (`@binger/shared`)

Cuando construyas una página (por ejemplo, el Diario de visualización), importa los servicios directamente desde el workspace compartido. Vite resolverá los cambios de forma instantánea gracias al Hot Module Replacement (HMR):

```typescript
// Ejemplo de uso en un componente de React Web
import { useEffect, useState } from 'react';
import { trackingApi, WatchLogResponse } from '@binger/shared';

export const DiaryPage = () => {
  const [logs, setLogs] = useState<WatchLogResponse[]>([]);

  useEffect(() => {
    trackingApi.getHistory().then((res) => setLogs(res.data));
  }, []);

  return (
    // Tu maquetación HTML/Tailwind cinemática aquí
  );
};

```
