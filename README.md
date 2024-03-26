

# Book Library

Welcome to Book Library, a Node.js application with a GraphQL API for managing books and users.

## Overview

Book Library is a web application built with Node.js and GraphQL. It allows users to manage books and users, including functionalities for authentication, book management (add, retrieve), and user management (register, login, logout).

## Getting Started

To get started with Book Library, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/abhi21121211/Book-Librari.git
   ```

2. Install dependencies:

   ```bash
   cd Book-Librari
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   ```

   Replace `YOUR_MONGODB_URI` with your MongoDB connection string and `YOUR_JWT_SECRET` with your JWT secret key.

4. Start the server:

   ```bash
   npm start
   ```

5. The server will start running on `http://localhost:3000`.

## Endpoints

### Authentication

- **Register User:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    mutation {
      register(input: { username: "testuser", email: "test@example.com", password: "password",role:"user" }) {
        token
        user {
          id
          username
          email
          role
        }
      }
    }
    ```

- **Login User:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    mutation {
      login(input: { email: "test@example.com", password: "password" }) {
        token
        user {
          id
          username
          email
          role
        }
      }
    }
    ```

- **Logout User:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    mutation {
      logout
    }
    ```

### Book Management

- **Get All Books:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    query {
      getBooks {
        id
        title
        author
        owner {
          id
          username
        }
      }
    }
    ```

- **Add a Book:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    mutation {
      addBook(input: { title: "Sample Book", author: "Sample Author" }) {
        id
        title
        author
        owner {
          id
          username
        }
      }
    }
    ```

- **Get Book by ID:**
  - Method: POST
  - URL: `https://book-librari.onrender.com/graphql`
  - Body (GraphQL):
    ```graphql
    query {
      getBook(id: "YOUR_BOOK_ID_HERE") {
        id
        title
        author
        owner {
          id
          username
        }
      }
    }
    ```

   Replace `"YOUR_BOOK_ID_HERE"` with the ID of the book you want to retrieve.

## Postman Collection

You can import the following Postman collection to test the endpoints:

[Book Library Postman Collection](https://app.getpostman.com/join-team?invite_code=29fc8eafca2495b338e6e8d9126ed757&target_code=b9a93c704410c29e5fe8ad83d4706336)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to this project.

