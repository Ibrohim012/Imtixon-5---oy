# Node.js tasviridan foydalanish
FROM node:18 AS build

# Ishchi katalogni yaratish
WORKDIR /app

# Package.json va package-lock.json fayllarini nusxalash
COPY package*.json ./

# Loyihaning barcha zaruriy paketlarini o'rnatish
RUN npm install

# Loyihaning manba kodlarini nusxalash
COPY . .

# Loyihani qurish (build)
RUN npm run build

# Ishga tushirish uchun yangi Node.js tasviridan foydalanish
FROM node:18

# Ishchi katalogni yaratish
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Portni ochish
EXPOSE 3000

# Loyihani ishga tushirish
CMD ["npm", "run", "start:prod"]
