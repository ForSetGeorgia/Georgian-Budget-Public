FROM ubuntu:16.10

ENV APPHOME=/myapp
RUN mkdir $APPHOME
WORKDIR $APPHOME

RUN apt-get update && \
    apt-get install -y nodejs npm

COPY package.json $APPHOME/

RUN npm set progress=false && \
    npm install --loglevel http

# some packages reference node as "node". This simlink fixes
# the naming issue for those packages. (Example: http-server)
# https://github.com/nodejs/node-v0.x-archive/issues/3911
RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY . $APPHOME/
