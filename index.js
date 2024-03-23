// index.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { typeDefs, resolvers } = require('./src/schema');
const { authenticateToken } = require('./src/utils/authUtils');
const cookieParser = require('cookie-parser'); // Add this line

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Add cookie-parser middleware
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    return { req, res };
  },
});

// Start the server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  
  // Apply authentication middleware to all GraphQL endpoints
  app.use(authenticateToken);

  // Define port
  const PORT = process.env.PORT || 3000;

  // Start listening on the defined port
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(error => console.error('Error starting server:', error));
