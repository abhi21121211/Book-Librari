// src/resolvers/bookResolvers.js

const Book = require('../models/Book');

const bookResolvers = {
  Query: {
    getBook: async (_, { id }) => {
      try {
        const book = await Book.findById(id).populate('owner');
        return book;
      } catch (error) {
        throw new Error('Book not found');
      }
    },
    getBooks: async () => {
      try {
        const books = await Book.find().populate('owner');
        return books;
      } catch (error) {
        throw new Error('Error fetching books');
      }
    },
  },
  Mutation: {
    addBook: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      try {
        const newBook = new Book({
          ...input,
          owner: user.id,
        });
        await newBook.save();
        return newBook.populate('owner').execPopulate();
      } catch (error) {
        throw new Error('Error adding book');
      }
    },
  },
};

module.exports = bookResolvers;
