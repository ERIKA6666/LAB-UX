# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install
RUN npm install @radix-ui/react-dropdown-menu

# Copiar todo el código fuente
COPY . .

# Comando para ejecutar en modo desarrollo
CMD ["npm", "run", "dev"]
