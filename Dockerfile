# Stage 0: Set Node.js environment
FROM node:20-alpine AS base

ARG NODE_ENV="development" NEXT_TELEMETRY_DISABLED="1" 
ARG _STRAPI_PROTOCOL="http" _STRAPI_HOSTNAME="localhost" _STRAPI_IMAGEPATHNAME="/uploads/**/*" 
ARG _ALGOLIA_APP_ID="V1O1Y893BB" _ALGOLIA_SEARCHAPI_KEY="38e9cbad717ef476b439bd62484bb56d"

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Stage 2: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} 
ENV NEXT_PUBLIC_STRAPI_PROTOCOL=${_STRAPI_PROTOCOL} NEXT_PUBLIC_STRAPI_HOSTNAME=${_STRAPI_HOSTNAME} NEXT_PUBLIC_STRAPI_URL="${_STRAPI_PROTOCOL}://${_STRAPI_HOSTNAME}" NEXT_PUBLIC_STRAPI_IMAGEPATHNAME=${_STRAPI_IMAGEPATHNAME} 
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${_ALGOLIA_APP_ID} NEXT_PUBLIC_ALGOLIA_SEARCHAPI_KEY=${_ALGOLIA_SEARCHAPI_KEY}

RUN npm run build

# Stage 3: Copy all files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=${NODE_ENV} NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]