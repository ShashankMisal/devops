# ---- Stage 1: Build Angular app ----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Remove default nginx page
RUN rm -f /usr/share/nginx/html/index.html

# Angular (newer builders) often output to dist/<app>/browser. Copy that if present.
COPY --from=build /app/dist/*/browser/ /usr/share/nginx/html/


# Copy runtime env config
COPY src/assets/env.js /usr/share/nginx/html/assets/env.js

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]