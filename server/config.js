const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/rerb',
  port: process.env.PORT || 4000,
  secret: 'secretmsg',
};

export default config;
