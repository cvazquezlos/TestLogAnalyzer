FROM openjdk:8-jre-alpine
COPY ./target/es.client-2.0.0.jar /usr/src/es.client/
WORKDIR /usr/src/es.client
EXPOSE 8443
CMD ["java", "-jar", "es.client-2.0.0.jar"]
