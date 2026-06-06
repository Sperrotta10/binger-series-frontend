# 🎨 Midnight Kinetic - Design System Tokens

Este documento es la única fuente de verdad (_Single Source of Truth_) para la interfaz visual del ecosistema frontend de **Binger**. Define la paleta de colores, tipografía, formas y capas de elevación para lograr una estética **Futuristic Cinematic** (Look de Centro de Comando de alta gama).

---

## 👁️ Visual Identity & Brand Personality

- **Aesthetic:** Immersive, sophisticated, and technologically advanced.
- **Influences:** Glassmorphism, deep tonal layering, and high-contrast neon glows over an infinite dark void.
- **Emotional Goal:** Make the user feel like a professional curator of their own cinematic universe.
- **Anti-Green Policy:** Prohibido el uso de tonos verdes (para no parecerse a Spotify) o grises tierra (para distanciarse de Letterboxd). Los estados de éxito/progreso usan cian/violeta; los errores usan magenta/rojo brillante.

---

## 🎨 Color Palette Tokens

Los colores se basan en el contraste estricto de luces de neón sobre superficies oscuras reflectantes.

### 1. Base Surfaces & Backgrounds

| Token                       | Hex Code  | Usage / Description                                               |
| :-------------------------- | :-------- | :---------------------------------------------------------------- |
| `background`                | `#121317` | Deep Space Midnight. Fondo base de toda la aplicación.            |
| `surface`                   | `#121317` | Mismo tono base para consistencia de suelo plano.                 |
| `surface-dim`               | `#121317` | Tono atenuado para capas secundarias fijas.                       |
| `surface-bright`            | `#38393e` | Superficies iluminadas o bordes de interacción.                   |
| `surface-container-lowest`  | `#0d0e12` | El vacío más profundo. Fondos de inputs o zonas hundidas.         |
| `surface-container-low`     | `#1a1b20` | Contenedores sutiles de fondo.                                    |
| `surface-container`         | `#1f1f24` | Slate Blue. Base para el efecto **Glassmorphism** (con opacidad). |
| `surface-container-high`    | `#292a2e` | Elementos elevados o tarjetas en estado normal.                   |
| `surface-container-highest` | `#343439` | Tarjetas en estado hover o capas superiores fijas.                |

### 2. Accent & Kinetic Lights (Neon Glows)

| Token               | Hex Code  | Usage / Description                                                   |
| :------------------ | :-------- | :-------------------------------------------------------------------- |
| `primary`           | `#dcb8ff` | Vivid Violet. Botones principales, progreso activo y focos críticos.  |
| `primary-container` | `#8a2be2` | Sólido de acento para fondos de botones de acción principal.          |
| `secondary`         | `#ffffff` | Blanco puro para alto contraste de lectura sobre fondos oscuros.      |
| `secondary-fixed`   | `#00fbfb` | Cyan Neon. Visualización de datos, sub-iconos y elementos de escaneo. |
| `tertiary`          | `#bec7d6` | Gris frío metálico para textos secundarios y etiquetas inactivas.     |

### 3. System Feedback (Alerts)

| Token             | Hex Code  | Usage / Description                                          |
| :---------------- | :-------- | :----------------------------------------------------------- |
| `error`           | `#ffb4ab` | Magenta claro para textos de alerta o validaciones fallidas. |
| `error-container` | `#93000a` | Rojo profundo para fondos de botones de peligro/eliminación. |

---

## 📐 Typography System

El sistema tipográfico combina la geometría futurista para títulos con la legibilidad extrema para metadatos del catálogo.

- **Headlines & Titles: Sora** (Geometric, structural, tight letter-spacing for a "locked-in" tech look).
- **Body & System Metadata: Hanken Grotesk** (Sharp, contemporary, ultra-legible).

| Token                 | Font Family    | Size   | Weight         | Line Height | Tracking             |
| :-------------------- | :------------- | :----- | :------------- | :---------- | :------------------- |
| `display-lg`          | Sora           | `48px` | Bold (700)     | `56px`      | `-0.02em`            |
| `headline-lg`         | Sora           | `32px` | SemiBold (600) | `40px`      | `-0.01em`            |
| `headline-lg-mobile`  | Sora           | `28px` | SemiBold (600) | `36px`      | Standard             |
| `headline-md`         | Sora           | `24px` | Medium (500)   | `32px`      | Standard             |
| `body-lg`             | Hanken Grotesk | `18px` | Regular (400)  | `28px`      | Standard             |
| `body-md`             | Hanken Grotesk | `16px` | Regular (400)  | `24px`      | Standard             |
| `label-md` (Metadata) | Hanken Grotesk | `14px` | SemiBold (600) | `20px`      | `0.05em` (UPPERCASE) |
| `label-sm`            | Hanken Grotesk | `12px` | Medium (500)   | `16px`      | Standard             |

---

## 📐 Layout, Spacing & Rhythm

El ritmo visual se rige estrictamente por una **escala de 8px** para mantener la consistencia matemática.

- **Base Scale:** `8px`
- **`xs`**: `4px` | **`sm`**: `12px` | **`md`**: `24px` (Gutters estándar entre tarjetas de series).
- **`lg`**: `48px` | **`xl`**: `80px` (Separadores verticales entre secciones mayores de contenido).
- **Margins:**
  - `margin-mobile`: `16px` (Bordes laterales en smartphones).
  - `margin-desktop`: `64px` (Bordes laterales en pantallas web panorámicas).

---

## 💎 Elevation, Depth & Shapes

### 1. Shape Language (Soft Architectural)

Binger evita los bordes redondeados tipo "píldora" orgánica, optando por cortes limpios y maquinados:

- **Buttons, Cards & Media Thumbnails:** Radio constante de `4px` (`0.25rem` / `rounded-md`).
- **Progress Bars:** Terminado recto (`0px` o `2px` máximo) emulando luces indicadoras de hardware premium.

### 2. Tonal Layering & Neon Glows

La profundidad se maneja superponiendo capas con transparencias y resplandores, no con sombras negras:

- **Level 0 (Floor):** Fondo sólido `#121317`.
- **Level 1 (Glass Panels):** Contenedores `#1f1f24` al **70% de opacidad**, borde sutil de `1px white/10` y un filtro de desenfoque de fondo (`backdrop-blur`) de `12px`.
- **Level 2 (Active Focus):** El elemento seleccionado gana un trazo exterior de `0.5px` en Cyan o Vivid Violet y un brillo de neón suave (`blur: 15px`, `opacity: 0.3`).
- **Overlays (Modales):** Fondo oscuro al 80% negro con desenfoque extremo de `20px` para aislar por completo la atención.
