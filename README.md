# State Management Pilot

# State Manager

### Requirements
To be able to run and develop the application you need the following software installed:
- [MySQL](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/get-npm)
- [Angular CLI](https://cli.angular.io/)

### Initial Setup
1. Clone the project from Github.
2. First start MySQL and create a schema named `state-manager`.
3. Next create the `state-management-db-user` database user and grant it all privileges on our schema.
4. To setup the database, connect to the MySQL server, and execute `backend/database-setup.sql`.
5. This project uses the Stellar design system, follow the install instructions from Artifactory [here](https://github.jpl.nasa.gov/Stellar/stellar#installation-prerequisites)

### Running The Application
1. Ensure MySQL server is running.
2. Follow the run instruction for the [front-end](front-end/README.md).
3. Follow the run instruction for the [backend](backend/README.md).

## Running the Application in Docker
### Initial Setup
1. If the environment variables in the `docker-compose.yml` file are not correct for your database connection, update them.
1. Create a `.env` file in the main project directory with the database connection password: `DB_PASS=somePassword`
    1. Note: The `.env` file will not be checked in to Github.

### Subsequent Runs
1. If changes have been made, rebuild the docker images: `docker-compose build`
1. Run State Manager: `docker-compose up`
    1. State Manager should now be running on localhost:8000
1. When done, clean up docker containers with: `docker-compose down`
### Usage

CSV / Json Upload
Each type has a different format listed below:

#### State Enumeration Upload

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

#### Events Upload

CSV:
```
identifier,displayName,type,description,externalLink
UPLOADED_EVENT_1,Uploaded Event 1,evr,,
```

JSON:
```
[
  {
    "identifier": "UPLOADED_EVENT_1",
    "displayName": "Uploaded Event 1",
    "description": "",
    "externalLink": "",
    "type": "evr"
  },
  {
    ...
  }
]
```

#### Information Types Upload

CSV:
```
informationType,identifier,displayName,description,externalLink
Activity,test_activity,Test Activity,,
Command,test_command,Test Command,,
FlightRule,test_flight_rule,Test Flight Rule,,
FSWParameter,test_fsw_parameter,Test FSW Parameter,,
Model,test_model,Test Model,,
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
         "informationType": Activity,
         "identifier": "test_activity",
         "displayName": "Test Activity",
         "description": "",
         "externalLink": ""
     },
     {
         "informationType": "Command",
         "identifier": "test_command",
         "displayName": "Test Command",
         "description": "",
         "externalLink": ""
     },
     {
         "informationType": FlightRule,
         "identifier": "test_flight_rule",
         "displayName": "Test Flight Rule",
         "description": "",
         "externalLink": ""
     },
     {
         "informationType": "FSWParameter",
         "identifier": "test_fsw_parameter",
         "displayName": "Test FSW Parameter",
         "description": "",
         "externalLink": ""
     },
     {
         "informationType": "Model",
         "identifier": "test_model",
         "displayName": "Test Model",
         "description": "",
         "externalLink": ""
     }
]
```

#### Relationships Upload

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

#### State Upload

CSV:
```
identifier,displayName,dataType,type,units,source,subsystem,description,externalLink
STATE_IDENTIFIER_1,State Identifier 1,subsystem,state,test units,test source,identifier 1,https://google.com
```

JSON:
```
[
  {
    "identifier": "STATE_IDENTIFIER_1",
    "displayName": "Test",
    "dataType": "",
    "type": "asd",
    "units": "asd",
    "source": "asd",
    "subsystem": "asd",
    "description": "",
    "externalLink": ""
  },
  {
    ...
  }
]
```

You can upload more states by adding each one on a new line.  If any states you try and upload have identifiers that are already in the database the upload will fail.
