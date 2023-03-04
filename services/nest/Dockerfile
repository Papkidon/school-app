# --------------> The build image
FROM node:19-bullseye-slim AS build

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Create app directory
WORKDIR /services/nest

# Copy project dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma prisma

# Install app dependencies
RUN npm i

# Bundle app source
COPY --chown=node:node . .

# Generate Prisma client, then
# compile project to JavaScript
RUN npx prisma generate && npm run build

# --------------> The production image
FROM node:19-bullseye-slim

# Copy dumb-init from first stage build
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

# Set working directory
WORKDIR /services/nest

# Change ownership recursively of workdir to node
RUN chown -R node:node /services/nest

# Set default user as node
USER node:node

# Copy package.json from first stage build
COPY --chown=node:node --from=build /services/nest/package*.json /services/nest/
# Copy public  directory
COPY --chown=node:node --from=build /services/nest/public /services/nest/public
# Copy compiled project
COPY --chown=node:node --from=build /services/nest/dist /services/nest/dist
# Copy prisma directory
COPY --chown=node:node --from=build /services/nest/prisma /services/nest/prisma
# Copy prisma client
COPY --chown=node:node --from=build /services/nest/node_modules/.prisma /services/nest/node_modules/.prisma

# Metadata about exposed port
EXPOSE 3000:3000

# Install only production dependencies
RUN npm ci --only=production

# Start the app
CMD [ "npm", "run", "start:migrate:prod" ]
