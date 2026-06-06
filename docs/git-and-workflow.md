# Flujo de Trabajo y Gestión de Git (Monorepo)

Este documento define las reglas de Git, la convención de mensajes de commit y el flujo de trabajo para el desarrollo del ecosistema frontend de **Binger**. El objetivo es mantener un historial limpio, trazable y facilitar la integración continua.

---

## 🌲 Estrategia de Ramas (Git Flow Simplificado)

Trabajaremos con un modelo basado en una rama principal protegida y ramas de características (_feature branches_):

- **`main`**: Rama de producción. Contiene el código completamente estable que está corriendo en la web (producción) y las builds oficiales de Expo (EAS). Nadie commitea directo a `main`.
- **`feature/hola-mundo`**: Ramas cortas creadas para desarrollar una funcionalidad, pantalla o corrección específica. Se originan de `main` y vuelven a `main` mediante un Pull Request (PR).

### Ciclo de vida de una tarea:

1. Sincronizar local con los últimos cambios: `git checkout main && git pull`
2. Crear rama descriptiva: `git checkout -b feature/lists-ui-drag-drop`
3. Desarrollar, testear localmente y hacer commits estructurados.
4. Subir la rama a GitHub y abrir un Pull Request hacia `main`.

---

## ✍️ Convención de Commits (Conventional Commits)

Para saber exactamente qué se modificó en el monorepo con solo mirar el historial, utilizaremos la especificación de **Conventional Commits**, adaptada para especificar el **alcance (scope)** dentro de nuestro monorepo.

### Estructura del Mensaje:

```text
<tipo>(<alcance>): <descripción corta en minúsculas>

```

### Tipos Permitidos (`<tipo>`):

- `feat`: Una nueva funcionalidad (ej. la pantalla de agregar a lista).
- `fix`: Solución a un error o bug (ej. un input que rompía la app móvil).
- `docs`: Cambios exclusivos en la documentación (ej. actualizar este archivo).
- `style`: Cambios de diseño, formateo o CSS que no alteran la lógica (Prettier, espaciados).
- `refactor`: Modificación de código que ni corrige un bug ni añade una función (limpieza de código).
- `chore`: Tareas de mantenimiento, actualización de dependencias o configuración de herramientas (Turbo, pnpm).

### Alcances Permitidos en nuestro Monorepo (`<alcance>`):

Dado que tenemos varias apps y paquetes en el mismo repositorio, es obligatorio indicar qué parte del ecosistema estás tocando:

- `web`: Cambios exclusivos de la aplicación web en React.
- `mobile`: Cambios exclusivos de la app móvil en Expo/React Native.
- `shared`: Cambios en el paquete lógico común (`packages/shared`).
- `repo`: Cambios globales que afectan a todo el monorepo (ej. el `package.json` raíz o `turbo.json`).

### Ejemplos Correctos de Commits:

- `feat(mobile): implement premium glassmorphic UI for diary screen`
- `fix(shared): fix pagination metadata parsing in lists api client`
- `docs(repo): update git-and-workflow guide with commit examples`
- `chore(web): upgrade vite to latest stable version`

---

## 🔄 Sincronización con el Repositorio de Backend

Como el **Backend vive en otro repositorio independiente**, debemos seguir este protocolo cuando ocurran cambios en la API para evitar romper el frontend:

### Escenario A: El Backend añade un nuevo endpoint o cambia un payload

Si en el repositorio del backend se modifica un contrato (por ejemplo, el ajuste que hicimos en el módulo de actividad con las reviews o estadísticas):

1. **Actualizar `@binger/shared` primero**: Ve al paquete compartido y modifica el cliente de Axios, actualiza el esquema de Zod y exporta los nuevos tipos de TypeScript para que coincidan con el backend.
2. **Verificar compilación**: Ejecuta `pnpm --filter @binger/shared build` para asegurar que TypeScript compile la lógica compartida sin errores.
3. **Implementar en las Apps**: Ve a `apps/web` o `apps/mobile` para consumir los nuevos métodos tipados. El editor te marcará de inmediato si algo cambió y evitas errores en tiempo de ejecución.

### Escenario B: Reportar un Bug del Backend desde el Frontend

Si mientras desarrollas en React o Expo notas que un endpoint devuelve un error `500` o un formato JSON inesperado:

1. **No intentes parchar el backend desde el frontend** (evita meter código sucio en las apps para "arreglar" una respuesta rota del servidor).
2. Abre un _Issue_ o notifica el cambio necesario en el repositorio del Backend.
3. Una vez corregido y desplegado el backend, alinea el paquete `@binger/shared` del monorepo.

---

## 🚀 Lista de Verificación antes de Enviar un Pull Request

Antes de darle `git push` a tu rama y solicitar la fusión a `main`, asegúrate de correr este comando en la raíz del monorepo:

```bash
pnpm lint && pnpm build

```

- **`pnpm lint`** comprobará que no dejes variables muertas ni código sucio.
- **`pnpm build`** obligará a Turborepo a compilar el paquete `shared`, la aplicación `web` y verificar que la app `mobile` ensamble correctamente. Si este comando pasa con éxito en tu máquina local, tienes la garantía absoluta de que tu código está listo para integrarse.
