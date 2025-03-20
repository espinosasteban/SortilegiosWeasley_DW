# SortilegiosWeasley_DW

Este proyecto es una página web basada en MongoDB, Node.js, Express y React, retratando la tienda virtual de Sortilegios Weasley, una tienda ficticia del universo de Harry Potter, ubicada en el Callejón Diagon y propiedad de los gemelos Fred y George Weasley.

![Screenshot 2025-03-20 140304](https://github.com/user-attachments/assets/de0f3880-8c8f-4f55-b7cf-da8f73ce52bd)

![Screenshot 2025-03-20 141505](https://github.com/user-attachments/assets/15f60466-5bb7-495b-a68f-0f9b0e8ce6bb)

https://github.com/user-attachments/assets/36e0bd63-907f-4c29-a9c6-0d2446dec734

![Screenshot 2025-03-20 140507](https://github.com/user-attachments/assets/69973c6d-5502-453b-912d-691a73d75354)

![Screenshot 2025-03-20 140657](https://github.com/user-attachments/assets/9718489e-5f4d-4787-b254-e291e7e26cc6)

![Screenshot 2025-03-20 140758](https://github.com/user-attachments/assets/2bd8b697-2515-4553-a2b6-9cd273883310)

![Screenshot 2025-03-20 140817](https://github.com/user-attachments/assets/6f00791e-dab2-4fa8-a267-ff192f2324ba)

A continuación, se detallan las instrucciones para ejecutar el proyecto en tu entorno local.

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
cd SortilegiosWeasley
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
