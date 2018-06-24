FROM node:8.11-jessie
RUN mkdir -p /usr/src/share
WORKDIR /usr/src/share

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/share/node_modules/.bin:$PATH

COPY ./package.json /usr/src/share
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
