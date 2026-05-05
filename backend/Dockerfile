# Build stage
FROM maven:3.8.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Limit memory to 384MB to leave room for the OS (Render free tier is 512MB)
ENTRYPOINT ["java", "-Xmx384m", "-Xss512k", "-jar", "app.jar"]
