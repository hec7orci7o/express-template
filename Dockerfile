FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --save-prod
RUN npm install
RUN npm install pm2@latest -g

# Bundle app source
COPY ./.env .
COPY ./build .

CMD [ "pm2-runtime", "app.js" ]
