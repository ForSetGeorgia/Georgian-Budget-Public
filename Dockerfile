FROM node:6

ENV APPHOME=/myapp
RUN mkdir $APPHOME
WORKDIR $APPHOME

RUN npm install -g yarn pm2 nodemon

COPY package.json yarn.lock $APPHOME/
RUN yarn install

# Issue described here: https://github.com/sass/node-sass/issues/1527
RUN npm rebuild node-sass

COPY . $APPHOME/
