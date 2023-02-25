# --------------> The build image
FROM node:18-bullseye-slim AS build

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Create app directory
WORKDIR /services/nest

# Copy project dependencies
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm i

# Bundle app source
COPY --chown=node:node . .

# Generate Prisma client, then
# compile project to JavaScript
RUN npx prisma generate && npm run build

# --------------> The production image
FROM node:18-bullseye-slim

# Copy dumb-init from first stage build
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

# Set working directory
WORKDIR /services/nest

# Change ownership recursively of workdir to node
RUN chown -R node:node /services/nest

# Set default user as node
USER node:node

# Copy package.json from first stage build
COPY --from=build --chown=node:node /services/nest/package*.json /services/nest/
COPY --from=build --chown=node:node /services/nest/tsconfig*.json /services/nest/
COPY --from=build --chown=node:node /services/nest/prisma /services/nest/prisma
COPY --from=build --chown=node:node /services/nest/node_modules /services/nest/node_modules
# Copy compiled project
COPY --chown=node:node --from=build /services/nest/dist /services/nest/dist

# Metadata about exposed port
EXPOSE 3000:3000

# Install only production dependencies
#RUN npm ci --only=production
RUN npx prisma generate && npx prisma migrate

# Start the app
# TODO: Change this to CMD [ "dumb-init", "node", "dist/main.js" ]
CMD [ "npm", "start" ]