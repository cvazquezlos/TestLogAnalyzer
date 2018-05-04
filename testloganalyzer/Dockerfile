FROM openjdk:8-jre-alpine
COPY ./target/testloganalyzer-5.0.0.jar /usr/src/testloganalyzer/
WORKDIR /usr/src/testloganalyzer
EXPOSE 8443
CMD ["sleep", "45"]
CMD ["java", "-jar", "-Dspring.profiles.active=prod", "testloganalyzer-5.0.0.jar"]