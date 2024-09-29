# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including Prisma)
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma Client (needed for production)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies, including Prisma
RUN npm install --only=production

# Copy the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Define build arguments for environment variables
ARG DATABASE_URL
ARG DIRECT_URL

# Set environment variables in the container
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

# Expose the listening port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
