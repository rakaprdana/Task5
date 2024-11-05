# Gunakan node versi LTS
FROM node:18-bullseye

# Buat direktori app
WORKDIR /usr/src/app

# Install dependensi terlebih dahulu untuk memanfaatkan Docker cache
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 5000

# Command untuk menjalankan aplikasi
CMD ["npm", "test"]