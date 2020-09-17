# Multi-stage Docker build

# Build stage
FROM maven as build
WORKDIR /usr/src/
COPY . .
RUN mvn package

# Run stage
FROM tomcat:9.0.17-jre8
COPY --from=build /usr/src/dist /usr/local/tomcat/webapps
