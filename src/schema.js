// src/schema.js

const { gql } = require('apollo-server-express');
const userTypeDefs = require('./schema/userSchema');
const bookTypeDefs = require('./schema/bookSchema');
const userResolvers = require('./resolvers/userResolvers');
const bookResolvers = require('./resolvers/bookResolvers');

// Define the root schema
const rootTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Combine all type definitions
const typeDefs = [rootTypeDefs, userTypeDefs, bookTypeDefs];

// Combine all resolvers
const resolvers = [userResolvers, bookResolvers];

module.exports = { typeDefs, resolvers };
