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
        // Create a new Book document
        const newBook = new Book({
          title: input.title,
          author: input.author,
          owner: user.id, // Set owner ID as a string
        });

        // Save the new book to the database
        await newBook.save();

        // Retrieve the newly saved book from the database
        const savedBook = await Book.findById(newBook._id).populate('owner');

        // Return the newly saved book
        return savedBook;
      } catch (error) {
        console.error('Error adding book:', error); // Log the error message
        throw new Error('Error adding book');
      }
    },
  },
};

module.exports = bookResolvers;
