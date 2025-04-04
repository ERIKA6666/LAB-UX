# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todo el código fuente
COPY . .


# Instalar dependencias
RUN npm install

# Comando para ejecutar en modo desarrollo
CMD ["npm", "run", "dev"]
