FROM maven:3.9.6-eclipse-temurin-21-alpine

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
COPY frontend ./frontend

EXPOSE 8080

CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=docker"] 