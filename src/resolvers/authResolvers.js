const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/authUtils');

const authResolvers = {
  Mutation: {
    register: async (_, { input }) => {
      try {
        // Registration logic...
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        const token = generateToken(user);

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    logout: async (_, __, { res }) => {
      try {
        // Clear cookie or JWT token from client
        res.clearCookie('token');
        return true;
      } catch (error) {
        throw new Error('Error logging out');
      }
    },
  },
};

module.exports = authResolvers;