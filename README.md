# State Management Pilot

## Requirements

To be able to run the application you need the following software installed:
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [MySQL](https://www.mysql.com/)

To be able to develop the application you additionally need the following software installed:
- [NPM](https://www.npmjs.com/get-npm)
- [Maven](https://maven.apache.org/install.html)
- [Angular CLI](https://cli.angular.io/)

## Initial setup
1. First start MySQL and create a schema named `state-management-db`.
1. Next create the `state-management-db-user` database user and grant it all privileges on our schema.
1. To setup the database, connect to the MySQL server, and execute `database-setup.sql`.
1. If needed, change the `JDBC_URL` and `JDBC_PASS` in the docker-compose.yml file to point to your MySQL database and use the correct password for the database user.

## Running the application
1. Ensure MySQL server is running.
1. Ensure that `CORS_ALLOW_ORIGIN` in the docker-compose.yml file is set to `http://localhost`.
1. Run `docker-compose build` to build both the frontend and backend
1. Run `docker-compose up` to spin up the application. The application will be running at `http://localhost`.

## Running for development
1. Ensure MySQL server is running.
1. Change the `CORS_ALLOW_ORIGIN` in the docker-compose.yml file to `http://localhost:4200`.
1. Run `docker-compose build backend` to build only the backend.
1. Run `docker-compose up backend` to spin up only the backend.
1. Navigate to the `front-end` folder, and run `npm install` to install all the dependencies the front-end application needs.
1. Finally, run `ng serve` and the front-end application will be running at `http://localhost:4200/state-management`.  This serves the front-end, so it needs to continue running.

## Making changes
When changing the front-end in the development mode setup, the application will automatically be rebuilt and deployed after saving a file.
If you're changing the backend, after you've made your changes the `.war` file needs to be rebuilt and redeployed to the Docker container.
There are two ways to do this:
1. Without maven:
    1. `docker-compose down`
    1. `docker-compose build backend`
    1. `docker-compose up backend`
1. With maven:
    1. Run `. build.sh` from the main project folder.

## Usage

CSV / Json Upload

Each type has a different format listed below:

### State Enumeration Upload

CSV:
```
stateIdentifier,label,value
upload1,Off,0
upload1,On,1
```

JSON:
```
[
  {
    "stateIdentifier": "test_state_identifier",
    "label": "Off",
    "value": 0
  },
  {
    "stateIdentifier": "test_state_identifier",
    "label": "On",
    "value": 1
  }
]
```

### Events Upload

CSV:
```
identifier,displayName,description,externalLink
UPLOADED_EVENT_1,Uploaded Event 1,,
```

JSON:
```
[
  {
    "identifier": "UPLOADED_EVENT_1",
    "displayName": "Uploaded Event 1",
    "description": "",
    "externalLink": ""
  },
  {
    ...
  }
]
```

### Information Types Upload

CSV:
```
informationType,identifier,displayName,description,externalLink
Command,test_command,Test Command,,
```

JSON:
```
[
  {
    "informationType": "Command",
    "identifier": "TEST_COMMAND",
    "displayName": "Test Command",
    "description": "",
    "externalLink": ""
  },
  {
    ...
  }
]
```

### Relationships Upload

CSV:
```
displayName,description,subjectType,subjectIdentifier,targetType,targetIdentifier
Test upload relationship 1,test json relationship 1,Command,TEST_COMMAND,State,STATE_IDENTIFIER_1
```

JSON:
```
[
  {
    "displayName": "Test upload relationship 1",
    "description": "test",
    "subjectType": "Command",
    "subjectIdentifier": "TEST_COMMAND",
    "targetType": "State",
    "targetIdentifier": "IDENTIFIER_1"
  },
  {
    ...
  }
]
```

### State Upload

CSV:
```
identifier,displayName,type,units,source,subsystem,description
STATE_IDENTIFIER_1,State Identifier 1,test type,test units,test source,identifier 1
```

JSON:
```
[
  {
    "identifier": "STATE_IDENTIFIER_1",
    "displayName": "Test",
    "type": "asd",
    "units": "asd",
    "source": "asd",
    "subsystem": "asd"
  },
  {
    ...
  }
]
```

You can upload more states by adding each one on a new line.  If any states you try and upload have identifiers that are already in the database the upload will fail.
