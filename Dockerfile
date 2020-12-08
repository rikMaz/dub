FROM openjdk:15-oracle

MAINTAINER Rikardo Marenzzi <rikardo@marenzzi.de>

ADD backend/target/dub.jar app.jar

CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Djwt.secretkey=$JWT_SECRETKEY -Dspring.data.mongodb.uri=$MONGO_DB_URI app.jar"]
