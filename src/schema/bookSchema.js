// src/schema/bookSchema.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    owner: User!
  }

  input AddBookInput {
    title: String!
    author: String!
  }

  extend type Query {
    getBook(id: ID!): Book
    getBooks: [Book!]!
  }

  extend type Mutation {
    addBook(input: AddBookInput!): Book!
  }
`;

module.exports = typeDefs;
