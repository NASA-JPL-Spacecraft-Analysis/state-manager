# FSPA Proto App

This prototype app was written with Angular (TypeScript), NGRX, Jersey (Java), Docker, and MySQL.

## Requirements

To be able to run the application you need the following software installed:
- [NPM](https://www.npmjs.com/get-npm)
- [Maven](https://maven.apache.org/install.html)
- [Angular CLI](https://cli.angular.io/)
- [Docker](https://docs.docker.com/install/)

## Running for the first time

1. First start Docker, in the root directory run `docker-compose up`. Docker needs to be running at all times during development for the RESTful web services to respond.
2. If this is your first time running the app, you'll need to setup the database.  Connect to the now running MySQL server, and execute `database-setup.sql`.
3. Next we need to build and deploy the `.war` file to our running Tomcat server, so navigate to the `backend` directory and run `. deploy.sh`. 
4. Navigate to the `front-end` folder, and run `npm install` to install all the dependencies the front-end application needs.
5. Finally, run `ng serve` and the front-end application will be running at `http://localhost:4200/fspa-proto-app`.  This serves the front-end, so it needs to continue running as well.


## Running after initial setup

These instructions for subsequent runs of the application after you've followed the setup instructions above.

1. Start Docker, this needs to be running during development so the backend will respond to REST requests. `docker-compose up`
2. Start the front-end, this needs to be running during development to serve the front-end application:
    1. `cd front-end`
    2. `ng serve`

## Making changes

When changing the front-end, the application will automatically be rebuilt and deployed after saving a file.

If you're changing the backend, after you've made your changes the `.war` file needs to be rebuilt and redeployed to the Docker container.  To do this run `. deploy.sh` inside the `backend/` folder.
