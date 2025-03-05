# SortilegiosWeasley_DW

Este proyecto es una página web basada en Node.js y React. A continuación, se detallan las instrucciones para ejecutar el proyecto en tu entorno local.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [Git](https://git-scm.com/)

## Instalación y configuración

Sigue estos pasos para ejecutar el proyecto:

### 1. Clonar el repositorio

Abre una terminal y ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

```bash
 git clone https://github.com/espinosasteban/SortilegiosWeasley_DW.git
```

### 2. Navegar al directorio del proyecto

```bash
cd SortilegiosWeasley_DW
```

### 3. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` dentro de la carpeta `backend` del proyecto y define las variables necesarias. Un ejemplo de archivo `.env` es:

```env
PORT= tuPuerto
SERVER_DB=base_datos
USER_DB=usuario
PASSWORD_DB=contrasena
SECRET_KEY = secretKey
JWT_SECRET= secretKey
```

### 5. Iniciar el servidor

Para ejecutar el backend la aplicación en tu entorno local, usa los siguiente comandos desde la raiz:
```bash
npm run dev
```
```bash
cd backend
node app.js
```

### 6. Acceder a la aplicación

Abre tu navegador y dirígete a:

```
http://localhost:5173
```
