# Binger Mobile App (React Native + Expo)

Esta es la aplicación móvil oficial de **Binger**, construida con **React Native**, **TypeScript**, y potenciada por el ecosistema de **Expo**. La app está diseñada para ofrecer una experiencia fluida, rápida y con animaciones cinemáticas en dispositivos iOS y Android, permitiendo a los usuarios registrar su actividad de series desde cualquier lugar.

> 🔗 **Dependencia Clave:** Al igual que la versión web, esta aplicación móvil delega toda la lógica de negocio, clientes HTTP de Axios y tipados estrictos al paquete local `@binger/shared`.

---

## 🚀 Comandos de Desarrollo

Para trabajar exclusivamente dentro del entorno móvil, sitúate en esta carpeta (`cd apps/mobile`) y utiliza los siguientes comandos con `pnpm`:

| Comando        | Descripción                                                                                                |
| :------------- | :--------------------------------------------------------------------------------------------------------- |
| `pnpm start`   | Inicia el servidor de desarrollo de Expo (Expo CLI) y abre el menú de control.                             |
| `pnpm android` | Ejecuta el servidor y abre la aplicación directamente en tu emulador de Android (o dispositivo conectado). |
| `pnpm ios`     | Ejecuta el servidor y abre la aplicación en el simulador de iOS (requiere macOS y Xcode).                  |
| `pnpm lint`    | Ejecuta ESLint para auditar la calidad del código fuente de la app móvil.                                  |

> 💡 **Tip de Monorepo:** Si prefieres no cambiar de carpeta, puedes lanzar la app móvil desde la raíz del monorepo usando: `pnpm --filter mobile start`.

---

## ⚙️ Variables de Envío y Entorno (`.env`)

Expo requiere que todas las variables de entorno destinadas a ser leídas por la aplicación móvil utilicen obligatoriamente el prefijo `EXPO_PUBLIC_`.

Crea un archivo `.env` dentro de esta carpeta (`apps/mobile/`) con la siguiente configuración:

```env
# URL de la API de Node.js (Apunta a tu servidor del backend)
# IMPORTANTE: Si pruebas en un dispositivo físico real en la misma red local,
# usa la IP de tu computadora (ej: 192.168.1.X) en lugar de localhost.
EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1

```

---

## 📂 Estructura de Carpetas (Arquitectura Móvil)

Para asegurar una base escalable y limpia, organizaremos el código fuente dentro de `src/` bajo el siguiente esquema:

```text
src/
├── assets/          # Iconos locales, pantallas de carga (splash screens) y assets nativos
├── components/      # Componentes UI atómicos optimizados para móvil (botones táctiles, modales nativos)
├── context/         # Estados globales móviles (Manejo de tokens de sesión con SecureStore, etc.)
├── hooks/           # Custom hooks para comportamiento móvil (gestos, ciclo de vida de la app)
├── screens/         # Vistas de la aplicación vinculadas a la navegación (Feed, BingerList, Profile)
├── navigation/      # Configuración del enrutador móvil (React Navigation / Expo Router)
├── theme/           # Estilos globales y variables de estilo nativas (o configuración de NativeWind)
└── App.tsx          # Componente raíz móvil

```

---

## 📱 Interfaz Visual Móvil y Rendimiento Táctil (Midnight Kinetic)

La app móvil adapta el sistema de diseño a pantallas táctiles de alta densidad, utilizando el concepto de **Capas Tonales y Resplandores** en lugar de sombras tradicionales.

### 🧩 Implementación en Componentes Móviles

- **Fondo Base (Nivel 0):** Fondo de pantallas en `#121317` (`background`).
- **Paneles de Contenido (Nivel 1):** Contenedores en `#1F1F24` (`surface-container`) con un borde perimetral de `0.5px` en `white` con `0.1` de opacidad.
- **Estados Activos (Nivel 2):** Al seleccionar o enfocar un elemento, este adquiere un borde de `0.5px` en Cyan (`#00FBFB`) o Vivid Violet (`#DCB8FF`) con un difuminado exterior suave de `15px` (`opacity: 0.3`).
- **Layout Móvil:** Rejilla fluida de 4 columnas con un margen lateral nativo estricto de `16px` (`spacing.margin-mobile`).

### 🚷 Política Anti-Verde del Sistema (Estricta)

Queda estrictamente prohibido el uso de tonos verdes para estados de éxito o guardado. Las alertas de error, borrado o remoción de la watchlist deben utilizar variaciones de `error` (`#FFB4AB`) o `error-container` (`#93000A`). El progreso de visualización de capítulos se dibuja mediante anillos de progreso con pista Cyan y barra de carga en Vivid Violet.

---

## 🛠️ Notas Cruciales de Configuración (Metro y pnpm)

Debido a que `pnpm` utiliza enlaces simbólicos (_symlinks_) para conectar `@binger/shared` con esta aplicación, Metro Bundler requiere instrucciones específicas para rastrear los paquetes fuera de la carpeta `mobile`.

- Nunca borres ni alteres el archivo `metro.config.js` de la raíz de esta aplicación, ya que contiene la propiedad `watchFolders` configurada para escanear todo el monorepo.
- Si instalas una librería nativa nueva (ej. `expo-secure-store`), recuerda correr `pnpm expo install <libreria>` dentro de esta carpeta para asegurar la compatibilidad exacta de versiones de Expo SDK.
