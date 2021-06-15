# syntax=docker/dockerfile:1
# build stage
FROM node:14.16.0 as build-stage
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]