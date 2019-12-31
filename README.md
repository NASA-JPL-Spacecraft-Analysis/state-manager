# State Management Pilot

## Requirements

To be able to run the application you need the following software installed:
- [NPM](https://www.npmjs.com/get-npm)
- [Maven](https://maven.apache.org/install.html)
- [Angular CLI](https://cli.angular.io/)
- [Docker](https://docs.docker.com/install/)
- [MySQL](https://www.mysql.com/)

## Running for the first time

1. First we need to start MySQL and create our schema named `state-management-db`. Next create the `state-management-db-user` account with all privileges on our schema.
2. Then start Docker, in the root directory run `docker-compose up`. Docker needs to be running at all times during development for the RESTful web services to respond.
3. If this is your first time running the app, you'll need to setup the database.  Connect to the now running MySQL server, and execute `database-setup.sql`.
4. Next we need to build and deploy the `.war` file to our running Tomcat server, so run `. build.sh`. 
5. Navigate to the `front-end` folder, and run `npm install` to install all the dependencies the front-end application needs.
6. Finally, run `ng serve` and the front-end application will be running at `http://localhost:4200/state-management`.  This serves the front-end, so it needs to continue running as well.


## Running after initial setup

These instructions for subsequent runs of the application after you've followed the setup instructions above.

1. Start Docker, this needs to be running during development so the backend will respond to REST requests. `docker-compose up`
2. Start the front-end, this needs to be running during development to serve the front-end application:
    1. `cd front-end`
    2. `ng serve`

## Making changes

When changing the front-end, the application will automatically be rebuilt and deployed after saving a file.

If you're changing the backend, after you've made your changes the `.war` file needs to be rebuilt and redeployed to the Docker container.  To do this run `. build.sh` inside the root directory.

## Usage

CSV Upload:
In order to upload a `.csv` file, it needs to use the following format:

```
"identifier","displayName","type","units","source","description"
"IDENTIFIER 1","Identifier 1","test type","test units","test source","identifier 1"
```

You can upload more states by adding each one on a new line.  If any states you try and upload have identifiers that are already in the database the upload will fail.
