# Sistema de Gestión de Tareas

Este proyecto es una aplicación de consola en Node.js para gestionar tareas multiusuario, con roles y administración avanzada. Ideal para portafolio profesional.

## Características

- Registro y login de usuarios con validación y contraseñas seguras.
- Roles: usuario normal y administrador.
- Los usuarios pueden:
  - Ver, agregar, marcar como hechas y borrar sus propias tareas (con timestamp).
- Los administradores pueden:
  - Ver todos los usuarios y sus roles.
  - Ver todas las tareas del sistema.
  - Registrar usuarios con cualquier rol.
  - Borrar usuarios y resetear contraseñas.
- Todas las acciones importantes quedan registradas en un log de auditoría.
- Validaciones robustas y manejo de errores global.
- Código modular, limpio y listo para escalar.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/Jdieego21/task-manager-node.git
   cd TU_REPOSITORIO
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Ejecuta la aplicación:
   ```sh
   node main.js
   ```

## Estructura del proyecto

- `main.js`: flujo principal y menú.
- `login.js`: gestión de usuarios y roles.
- `tasks.js`: gestión de tareas.
- `init.js`: inicialización de archivos.
- `audit.js`: log de auditoría.
- `users.json`: usuarios registrados.
- `tasks.json`: tareas de los usuarios.
- `audit.log`: registro de acciones importantes.

## Requisitos
- Node.js v18 o superior

## Contribución
¡Forkea el proyecto y mejora lo que quieras! Pull requests bienvenidos.

## Autor
- Diego Bohorquez
- https://github.com/Jdieego21

---

¿Listo para usar y mostrar en tu portafolio!
