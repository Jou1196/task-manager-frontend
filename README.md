# 🎨 Task Manager Frontend

Frontend de la aplicación Task Manager desarrollado con React + TypeScript. Permite gestionar tareas consumiendo una API REST construida en Spring Boot.

---

# 🚀 Tecnologías

* React
* TypeScript
* Vite
* Axios
* CSS moderno

---

# 🏗️ Arquitectura

El frontend está estructurado siguiendo separación por responsabilidades:

components/
services/
types/

## 🔹 Descripción

* **components**

  * Contiene los componentes UI (TaskForm, TaskList)

* **services**

  * Maneja la comunicación con el backend mediante Axios

* **types**

  * Define los tipos TypeScript para mantener tipado fuerte

---

# 📁 Estructura del proyecto

src/
├── components/
│   ├── TaskForm.tsx
│   └── TaskList.tsx
├── services/
│   └── taskService.ts
├── types/
│   └── task.ts
├── App.tsx
├── main.tsx
└── index.css

---

# ▶️ Instalación

## 1. Clonar o entrar al proyecto

cd task-manager-frontend

## 2. Instalar dependencias

npm install

---

# ▶️ Ejecución

npm run dev

Abrir en navegador:

http://localhost:5173

---

# 🔌 Conexión con Backend

El frontend consume la API en:

http://localhost:8080/api/tasks

Asegúrate de que el backend esté ejecutándose.

---

# ⚙️ Funcionalidades

* Crear tareas
* Listar tareas
* Filtrar por estado
* Cambiar estado
* Eliminar tareas
* Manejo de errores
* Consumo de API con Axios
* React Hooks (useState, useEffect)

---

# ⭐ Bonus implementados

* Loader (indicador de carga)
* Confirmación al eliminar
* Paginación en frontend
* UI mejorada con tarjetas
* Estados y prioridades visuales

---

# 🧠 Flujo de la aplicación

1. El usuario crea una tarea desde el formulario
2. Se envía al backend mediante Axios
3. La lista se actualiza automáticamente
4. El usuario puede:

   * filtrar tareas
   * cambiar estado
   * eliminar tareas

---

# 📌 Ejemplo de datos

{
"title": "Nueva tarea",
"description": "Descripción de prueba",
"status": "PENDING",
"priority": "HIGH"
}

---

# ⚠️ Consideraciones

* El backend debe estar activo
* Se usa CORS para permitir conexión
* Los datos se obtienen vía REST

---

# 🎯 Objetivo

Proveer una interfaz moderna, simple y funcional para gestionar tareas de manera eficiente.

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env

Luego configurar:

VITE_API_URL=http://localhost:8080/api/tasks

# 👨‍💻 Autor

Joseph Arias
