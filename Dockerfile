FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --save-prod

# Bundle app source
COPY ./.env .
COPY ./build .

EXPOSE 3000
EXPOSE 27017

CMD [ "node", "app.js" ]
