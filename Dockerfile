FROM node:15

# Create app directory
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production # production

# Bundle sources
COPY . .

# Expose port 3000
EXPOSE 3000

# Start app
CMD ["npm", "start"]