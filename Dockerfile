# pull base image of node
FROM node:10.15.3

# set working directory
WORKDIR /app

# install depenecies
COPY package.json yarn.lock ./
RUN yarn install --network-timeout=300000

# add app root
COPY . .

EXPOSE 3000

#start app
CMD ["yarn", "start"]

