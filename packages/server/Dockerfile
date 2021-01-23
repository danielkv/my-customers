FROM node:12-alpine

WORKDIR /usr/app

#install yarn
RUN ["apk", "add", "yarn"]

# copy package.json
COPY package*.json /usr/app/

# install dependences
RUN yarn

# copy files
COPY . .

# build app
RUN ["yarn", "build"]

# expose port
EXPOSE 3001

# run app
CMD ["yarn", "start"]