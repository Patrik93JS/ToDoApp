FROM node:16
# Installing libvips-dev for sharp compatability
RUN apt-get update && apt-get install -y libvips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
COPY ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm config set network-timeout 600000 -g
RUN npm install
WORKDIR /opt/app
COPY ./ .
RUN npm run build
EXPOSE 1338
CMD ["npm","run", "develop"]