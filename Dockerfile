# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm ci

COPY client/ .

ARG VITE_LASTFM_API_KEY
ARG VITE_LASTFM_USERNAME
ENV VITE_LASTFM_API_KEY=$VITE_LASTFM_API_KEY
ENV VITE_LASTFM_USERNAME=$VITE_LASTFM_USERNAME

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]