const dev = {
  app: {
    port: process.env.DEV_PORT || 3000,
  },
  db: {
    url: process.env.DEV_MONGODB_CONNECT,
  },
};

const product = {
  app: {
    port: process.env.PRODUCT_PORT || 5000,
  },
  db: {
    url: process.env.PRODUCT_MONGODB_CONNECT,
  },
};

const config = { dev, product };
const env = process.env.NODE_ENV;
module.exports = config[env];
