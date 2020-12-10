# State Manager Backend
> A backend implementation for state manager using GraphQL.

### To Run

Before running, clone the project, and then run:
1. `npm i`
2. Create a new file named `ormconfig.json` at the root of the project and fill it in with your database information.

```
{
  "type": "mysql",
  "host": "",
  "port": 3306,
  "username": "",
  "password": "",
  "database": "",
  "entities": [ "src/models/*.ts" ],
  "synchronize": false
}
```

After all the dependencies are installed, start the server by running `npm run start`.
The GraphQL playground will be available [here](http://localhost:4000).

