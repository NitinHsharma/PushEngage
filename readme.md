# PushEngage

## Prerequisites installation
    GIT
    Nodejs
    Docker OR (rabbitMQ and MongoDB running)
    
## Steps if using docker
1. docker pull rabbitmq
2. docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management
3. docker pull mongo
4. docker run --name some-mongo -d mongo 
5. docker inspect some-mongo | grep "IPAddress"
6. docker inspect some-rabbit | grep "IPAddress"


## configure application
1. clone the code
2. change the ip/host entries in config.js
3. npm install 
4. npm run start
5. repeat step 2-4 in all three folders

## postman collection
https://www.getpostman.com/collections/f9950ca45ede13fbbdee
