# Build stage: use Bun to generate static files
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .
# Generate static files
RUN bun --bun run generate

# Final stage: serve static with nginx (alpine)
FROM nginx:alpine AS production
# remove default nginx content and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
# copy custom nginx config to map /clocks/ prefix to root directory
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy generated static files (Nuxt 4 put static into .output/public)
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
