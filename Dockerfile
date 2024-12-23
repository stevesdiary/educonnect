FROM node:20-alpine 

WORKDIR /app

COPY . /app

RUN npm install

COPY . .

EXPOSE 3500

ENV NAME EduConnect

CMD ["npm", "start"]