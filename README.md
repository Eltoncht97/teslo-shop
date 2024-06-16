# Descripción
Mi proyecto personal de una tienda virtual con un lado administrativo, etc , etc

## Correr en dev

1. Clonar el proyecto
2. Crear una copia del archivo ```.env.template```, renobrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```
8. Purgar LocalStorage y SessionStorage en el navegador

## Correr en prod

1.