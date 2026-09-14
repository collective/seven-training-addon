# syntax=docker/dockerfile:1
ARG AURORA_VERSION
FROM plone/aurora-builder:${AURORA_VERSION} AS builder

COPY --chown=node packages/aurora-training-project /app/packages/aurora-training-project
COPY --chown=node registry.config.ts /app/
COPY --chown=node Makefile /app/Makefile
COPY --chown=node pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --chown=node .pnpmfile.cjs /app/.pnpmfile.cjs
COPY --chown=node package.json /app/package.json.temp
COPY --chown=node pnpm-lock.yaml /app/pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    set -e
    python3 -c "import json; orig_data = json.load(open('package.json.temp')); orig_deps = orig_data['dependencies']; data = json.load(open('package.json')); data['dependencies'].update(orig_deps); json.dump(data, open('package.json', 'w'), indent=2)"
    rm package.json.temp
    pnpm install && make build-deps
    # The "Likes" feature is backed by Prisma/SQLite. Generate the client (the
    # build bundles it) and create the database (baked into the image so a fresh
    # container starts with the schema in place).
    pnpm --filter aurora-training-project run prisma:generate
    pnpm --filter aurora-training-project run prisma:db:push
    pnpm build
    # This is necessary because the build is trying to recreate the node_modules folder
    # by telling it to CI=1 it will just recreate them
    CI=1 pnpm install --prod
EOT

FROM plone/aurora-prod-config:${AURORA_VERSION}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="aurora-training-project-frontend" \
      org.label-schema.description="Aurora Training Project frontend image." \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/

# The "Likes" feature reads its SQLite database through DATABASE_URL. The
# database (with schema) is baked into the image at /app during the build.
ENV DATABASE_URL="file:/app/packages/aurora-training-project/prisma/dev.db"

RUN <<EOT
    set -e
    corepack enable pnpm
    corepack use pnpm@11.20.0
    corepack prepare pnpm@11.20.0 --activate
EOT
