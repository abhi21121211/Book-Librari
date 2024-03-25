const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { typeDefs, resolvers } = require('./src/schema');
const { authenticateToken } = require('./src/utils/authUtils');

// Load environment variables from .env file
dotenv.config();


// Create an Express application
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // Pass the Express request and response objects to the context
    return { req, res, user: req.user }; // Add the `user` object to the context
  },
});
// Apply authentication middleware to all GraphQL endpoints
app.use(authenticateToken);
// Start the server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  
  


  // Define port
  const PORT = process.env.PORT || 3000;

  // Start listening on the defined port
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}



startServer().catch(error => console.error('Error starting server:', error));
