# Build env
FROM node:15 as build

# Create app directory
WORKDIR /app

# set path
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package*.json ./

RUN yarn install --silent
# RUN npm ci --only=production # production

# Bundle sources
COPY . .

# Build app
RUN yarn build

# # Prod env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#  IN CASE DOCKER BUILD FAILES
# export DOCKER_BUILDKIT=0
# export COMPOSE_DOCKER_CLI_BUILD=0