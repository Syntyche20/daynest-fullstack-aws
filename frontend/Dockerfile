# Étape de Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de Production
FROM nginx:stable-alpine
# ON COPIE TA CONFIG PERSONNALISÉE ICI
COPY nginx.conf /etc/nginx/conf.d/default.conf
# On copie le build React
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]