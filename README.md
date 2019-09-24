# FPSA Proto App

This prototype app was written with Angular (TypeScript), NGRX, Jersey (Java), Docker, and MySQL.

## Requirements

To be able to run the application you need the following software installed:
- [NPM](https://www.npmjs.com/get-npm)
- [Maven](https://maven.apache.org/install.html)
- [Angular CLI](https://cli.angular.io/)
- [Docker](https://docs.docker.com/install/)

## Running in Development

1. First start Docker, in the root directory run `docker-compose up`.
2. If this is your first time running the app, you'll need to setup the database.  Connect to the now running MySQL server, and execute `database-setup.sql`.
2. Next we need to build and deploy the `.war` file to our running Tomcat server, so navigate to the `backend` directory and run `. deploy.sh`. 
3. Navigate to the `front-end` folder, and run `npm install`.
4. Finally, run `ng serve` and the front-end application will be running at `http://localhost:4200/fpsa-proto-app`.
