FROM openjdk:15-oracle

MAINTAINER Rikardo Marenzzi <rikardo@marenzzi.de>

ADD backend/target/dub.jar app.jar

EXPOSE 5000

CMD ["sh" , "-c", "java -jar -Dserver.port=5000 -Djwt.secretkey=$JWT_SECRETKEY -Dspring.data.mongodb.uri=$MONGO_DB_URI app.jar"]
