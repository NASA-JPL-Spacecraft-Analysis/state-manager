import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import 'dotenv/config';

import {
  CollectionResolver,
  CommandResolver,
  CommandArgumentResolver,
  CommandArgumentEnumerationResolver,
  ConstraintResolver,
  EventResolver,
  GroupMappingResolver,
  GroupResolver,
  IdentifierTypeResolver,
  InformationTypeResolver,
  RelationshipResolver,
  StateResolver,
  VersionResolver
} from './resolvers/';

const main = async () => {
  const host = process.env.DB_URL;
  const password = process.env.DB_PASS;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;
  const username = process.env.DB_USER;

  if (
    password !== undefined &&
    port !== undefined &&
    database !== undefined &&
    host !== undefined &&
    username !== undefined
  ) {
    await createConnection({
      password,
      port: Number(port),
      database,
      host,
      username,
      type: 'mysql',
      entities: ['src/models/*.ts'],
      synchronize: false
    });
  } else {
    throw new Error(
      'Could not connect to database, please make sure DB_PASS, DB_PORT, DB_NAME, DB_URL, and DB_USER are defined in your environment'
    );
  }

  const dbSchema = await buildSchema({
    container: Container,
    resolvers: [
      CollectionResolver,
      CommandResolver,
      CommandArgumentResolver,
      CommandArgumentEnumerationResolver,
      ConstraintResolver,
      EventResolver,
      GroupMappingResolver,
      GroupResolver,
      IdentifierTypeResolver,
      InformationTypeResolver,
      RelationshipResolver,
      StateResolver,
      VersionResolver
    ],
    validate: false
  });

  const server = new ApolloServer({
    cors: {
      origin: (origin, callback) => {
        // Respond with the origin set to the caller.
        callback(null, true);
      },
      credentials: true
    },
    introspection: true,
    playground: {
      settings: {
        'request.credentials': 'include'
      }
    },
    schema: dbSchema,
    tracing: true
  });

  await server.listen(4000);

  console.log('Server has started!');
};

void main();
