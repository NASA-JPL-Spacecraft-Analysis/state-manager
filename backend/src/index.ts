import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

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
  await createConnection();

  const schema = await buildSchema({
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
    schema,
    tracing: true
  });

  await server.listen(4000);

  console.log('Server has started!');
};

void main();
