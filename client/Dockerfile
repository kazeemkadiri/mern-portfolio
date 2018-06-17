FROM node:8.11-jessie
RUN mkdir -p /usr/src/share
WORKDIR /usr/src/share
COPY ./package.json /usr/src/share
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
