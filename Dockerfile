# Gunakan node image yang ringan
FROM node:18-alpine

# Tentukan working directory di container
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Salin semua source code
COPY . .

# Build aplikasi Vite React
RUN npm run build
