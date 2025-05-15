# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
# Pass the env var at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]