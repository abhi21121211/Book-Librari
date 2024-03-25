const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
  role: String!
}
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: Boolean
  }
`;

module.exports = typeDefs;
