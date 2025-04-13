const dev = {
  app: {
    port: 3000,
  },
  db: {
    url: process.env.CONNECT_STRING_MONGODB_DEV,
  },
};

const product = {
  app: {
    port: 3000,
  },
  db: {
    url: process.env.CONNECT_STRING_MONGODB_PRODUCTION,
  },
};

const config = { dev, product };
const env = process.env.NODE_ENV;
module.exports = config[env];
