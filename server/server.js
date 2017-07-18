/* eslint-disable no-console */
import mongoose from 'mongoose';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';
import bodyParser from 'body-parser';
import serverConfig from './config';
import compression from 'compression';

require("./models/user");
const passport = require('passport');
const authCheckMiddleware = require('./middleware/auth-check');

import todos from './routes/todo.routes';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;
const app = express();


app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(passport.initialize());
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
app.use('/api/', todos);
app.use('/api', authCheckMiddleware);

import todosDummyData from './todosDummyData';
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

app.use('/static', express.static(path.join(__dirname, '../static')));
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL,  {
  useMongoClient: true,
  /* other options */
   

});



 todosDummyData();


if (isDeveloping) {
  console.log('Server started in development mode.');
  const compiler = webpack(config);
  const devMiddleware = webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    contentBase: 'app',
    // publicPath: 'static',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);
  app.get('*', (req, res) => {
    res.write(devMiddleware.fileSystem.readFileSync(path.resolve(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  console.log('Server started in production mode.');
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server running on http://0.0.0.0:%s/.', port);
});
