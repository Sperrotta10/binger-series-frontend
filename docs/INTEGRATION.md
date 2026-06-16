# 🔌 Binger Frontend-Backend Integration Blueprint

Este documento es la **Instrucción de Operación Senior** para guiar el proceso de integración entre el frontend (`apps/web`) y el backend, utilizando la lógica unificada del paquete core (`@binger/shared`).

Cualquier agente de IA o desarrollador que trabaje en tareas de integración **DEBE leer y validar** los archivos de sustento descritos aquí antes de generar código para evitar discrepancias en los contratos de datos o romper el tipado de TypeScript.

---

## 🗺️ 1. Infraestructura y Fuentes de Verdad Computacionales

Para cada módulo de integración, el sistema debe mapear e inspeccionar de forma obligatoria tres niveles de archivos:

```

┌──────────────────────────────────────────────┐
│ 1. Especificación API: docs/project/\*.md │ <- Contrato Teórico del Endpoint
└──────────────────────┬───────────────────────┘
▼
┌──────────────────────────────────────────────┐
│ 2. Base de Datos: prisma/schema.prisma │ <- Estructura Real y Relaciones
└──────────────────────┬───────────────────────┘
▼
┌──────────────────────────────────────────────┐
│ 3. Lógica Cliente: package/shared/src/ │ <- Servicios Axio/Fetch y Esquemas Zod
└──────────────────────────────────────────────┘

```

---

## 📑 2. Matriz de Correspondencia por Módulo

Al integrar una vista o componente, se debe auditar la siguiente documentación específica:

| Módulo de UI                                                     | 📄 Especificación API (Markdown)      | ⚙️ Servicios del Cliente Core               | 🗄️ Entidades Prisma Clave               |
| :--------------------------------------------------------------- | :------------------------------------ | :------------------------------------------ | :-------------------------------------- |
| **Autenticación** <br>_(Login, Register, Forgot Password)_       | `docs/project/auth-endpoints.md`      | `package/shared/src/api/services/auth`      | `User`, `Session`, `Account`            |
| **Exploración y Buscador** <br>_(Search, Filters, Detail Cards)_ | `docs/project/catalog-endpoints.md`   | `package/shared/src/api/services/catalog`   | `Show`, `Genre`, `Platform`             |
| **Ingesta de Datos** <br>_(OCR de Facturas, Cargas Externas)_    | `docs/project/ingestion-endpoints.md` | `package/shared/src/api/services/ingestion` | `Invoice`, `IngestionLog`               |
| **Historial y Tracking** <br>_(Diary Rows, Quick Log Modal)_     | `docs/project/activity-endpoints.md`  | `package/shared/src/api/services/activity`  | `ActivityLog`, `EpisodeWatch`, `Rating` |
| **Lista de Series** <br>_(My Lists, Custom Lists, Detail Cards)_ | `docs/project/list-endpoints.md`      | `package/shared/src/api/services/list`      | `List`, `ListItem`                      |
| **Ecosistema Social** <br>_(Followers, Likes, Custom Lists)_     | `docs/project/social-endpoints.md`    | `package/shared/src/api/services/social`    | `Follow`, `Like`, `List`, `Review`      |

---

## 🛠️ 3. Protocolo de Auditoría Antes de Codificar (Pre-Flight Checks)

Antes de escribir un hook de React o conectar un formulario en `apps/web`, el chat debe responder internamente las siguientes preguntas mediante comandos de inspección:

1. **Validación de Esquemas Zod:** ¿El esquema de validación en `package/shared/src/` coincide exactamente con los campos requeridos en el archivo `.md` del endpoint?
2. **Sincronización con Prisma:** ¿Los nombres de las propiedades mapeadas en el frontend coinciden con las columnas tipo _camelCase_ o _snake_case_ definidas en el `prisma/schema.prisma`?
3. **Manejo de Estados de Red:** ¿El servicio del cliente en `packages/shared` expone el manejo de tokens de autenticación, cabeceras de sesión o estados de carga (_loading/error_) requeridos por la vista?

> ⚠️ **Regla de Oro:** Si se detecta una discrepancia entre lo que pide el archivo de endpoints (`.md`) y lo que está programado en la carpeta de servicios de `shared/`, **NO asumas nada**. Detén la generación, reporta el error y solicita autorización para refactorizar primero el archivo de servicios del paquete compartido.

---

## 🧬 4. Directivas Estéticas para Respuestas de Integración (Midnight Kinetic)

Al generar el código integrado en el cliente, se deben inyectar directamente las directivas del sistema visual:

- **Fondo Base Absoluto:** `#121317` (Deep Dark Canvas).
- **Contenedores de Datos:** `#1F1F24` (Glassmorphism con filtros `backdrop-blur-md`).
- **Acentos Principales/Interactivos:** `#DCB8FF` (Vivid Violet) para focos, botones de guardado y estados activos.
- **Métricas Técnicas/Micro-Badges:** `#00FBFB` (Cyan Neon) para etiquetas de episodios, duraciones y metadatos cortos.
- **Calificaciones:** Clásico Amarillo de Estrellas (`#FFC107` o `#F5C518`) con soporte para incrementos de `0.5` mapeados al estado flotante del backend.

---

## 🤖 5. Instrucción de Activación para el Chat (Prompt Trigger)

Cuando el usuario pida realizar una tarea de integración, inicia la respuesta confirmando la lectura de este archivo con el siguiente formato:
_"[Integration Engine Activated] Leyendo contratos en docs/project/XXXX-endpoints.md, entidades en schema.prisma y servicios en package/shared/src/api/services/XXXX. Procediendo con el mapeo de datos..."_
