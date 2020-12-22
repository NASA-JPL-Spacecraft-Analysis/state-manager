import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import {
  CollectionResolver,
  EventHistoryResolver,
  EventResolver,
  GroupResolver,
  IdentifierTypeResolver,
  InformationTypeResolver,
  RelationshipHistoryResolver,
  RelationshipResolver,
  StateHistoryResolver,
  StateResolver
} from './resolvers/';

async function main() {
  await createConnection();

  const schema = await buildSchema({
    container: Container,
    resolvers: [
      CollectionResolver,
      EventHistoryResolver,
      EventResolver,
      GroupResolver,
      IdentifierTypeResolver,
      InformationTypeResolver,
      RelationshipHistoryResolver,
      RelationshipResolver,
      StateHistoryResolver,
      StateResolver
    ],
    validate: false
  });

  const server = new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    tracing: true
  });

  await server.listen(4000);

  console.log('Server has started!');
}

main();
