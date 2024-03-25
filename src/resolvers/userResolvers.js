const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error('User not found');
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return user;
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const { username, email, password } = input;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role:role|| 'user',
        });
        await newUser.save();
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        const User = require('../models/User');
        const dotenv = require('dotenv');
        
        dotenv.config();
        
        const generateToken = (user) => {
          return jwt.sign(
            {
              id: user.id,
              email: user.email,
              username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
        };
        
        const userResolvers = {
          Query: {
            getUser: async (_, { id }) => {
              try {
                const user = await User.findById(id);
                return user;
              } catch (error) {
                throw new Error('User not found');
              }
            },
            getUsers: async () => {
              try {
                const users = await User.find();
                return users;
              } catch (error) {
                throw new Error('Error fetching users');
              }
            },
            me: async (_, __, { user }) => {
              if (!user) {
                throw new Error('Authentication required');
              }
              return user;
            },
          },
          Mutation: {
            register: async (_, { input }) => {
              const { username, email, password } = input;
              try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                  throw new Error('User already exists');
                }
        
                const hashedPassword = await bcrypt.hash(password, 10);
        
                const newUser = new User({
                  username,
                  email,
                  password: hashedPassword,
                  role: 'user',
                });
                await newUser.save();
        
                const token = generateToken(newUser);
        
                return {
                  token,
                  user: newUser,
                };
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
            logout: async (_, __, { req, res }) => {
              try {
                res.clearCookie('token');
                return true;
              } catch (error) {
                throw new Error('Error logging out');
              }
            },
          },
        };
        
        module.exports = userResolvers;
        const token = generateToken(newUser);

        return {
          token,
          user: newUser,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginUser: async (_, { input }) => {
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
    logout: async (_, __, { req, res }) => {
      try {
        res.clearCookie('token');
        return true;
      } catch (error) {
        throw new Error('Error logging out');
      }
    },
  },
};

module.exports = userResolvers;
