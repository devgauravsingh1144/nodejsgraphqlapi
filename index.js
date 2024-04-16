const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Initialize Express
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  
  // Start the Apollo Server
  await server.start();

  // Apply the Apollo Server middleware to Express
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer().catch(error => console.error(error));
