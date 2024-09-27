# Imagen base para construir la aplicación
FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR ./

# Copia el archivo package.json y package-lock.json para instalar las dependencias primero
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install 

# # Instala 'serve' para servir la aplicación React en producción
# RUN npm install -g serve

# Copia el resto del código del proyecto dentro del contenedor
COPY . .

# Deshabilitar ESLint para la construcción de producción
ENV ESLINT_NO_DEV_ERRORS=true

# # Construye el proyecto de producción
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]



