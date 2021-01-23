import { Express } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';

/**
 * Setup GraphQL types and endpoint
 * @param app App instance
 */
export async function setupGraphQL(app: Express): Promise<ApolloServer> {
    // build schema
    const schema = await buildSchema({
        resolvers: [path.join(__dirname, '..', '/**/*.resolver.{ts,js}')],
    });

    const server = new ApolloServer({
        schema,
    });

    server.applyMiddleware({ app, path: '/graphql' });

    return server;
}
