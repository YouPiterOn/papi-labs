import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

async function bootstrap() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'library', url: process.env.LIBRARY_URL || 'http://localhost:3000/graphql' },
        { name: 'countries', url: process.env.COUNTRIES_URL || 'http://localhost:3001/graphql' },
      ]
    })
  });

  const server = new ApolloServer({ gateway });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: Number(process.env.PORT || 5000)
    }
  })

  console.log(`Server ready at: ${url}`);
}

bootstrap();