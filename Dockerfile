# Kerinti website — production image.
#
# Multi-stage build of the Next.js app in `standalone` mode (next.config.ts):
# the final image carries only the traced server bundle, the static assets
# and /public, and runs as the unprivileged `node` user.
#
# Built on the server itself by docker compose, so the image always matches
# the server's CPU architecture (x86_64 or ARM, e.g. a CasaOS board).

ARG NODE_VERSION=24-alpine

# ---- 1. dependencies ---------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
# libc6-compat: prebuilt native modules (sharp, turbopack) expect glibc shims.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- 2. build ------------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Optional contact-form endpoint. NEXT_PUBLIC_* values are inlined at build
# time, so it is a build argument, not a runtime variable. Empty = the form
# honestly reports that online sending is not active (lib/contact-service.ts).
ARG NEXT_PUBLIC_CONTACT_ENDPOINT=""
ENV NEXT_PUBLIC_CONTACT_ENDPOINT=${NEXT_PUBLIC_CONTACT_ENDPOINT}
RUN npm run build

# ---- 3. runtime ----------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# next/image writes its optimised-image cache here at runtime.
RUN mkdir -p .next/cache && chown node:node .next/cache

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

CMD ["node", "server.js"]
