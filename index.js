const debug = require('debug')('server:index');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const render = require('koa-ejs');
const {route} = require('./router');

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'view'),
  viewExt: 'html',
  layout: false,
  cache: false,
  debug: false,
});

app.use(logger());
app.use(bodyParser());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(route.routes());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`Server is running on ${port}.`);
});

module.exports = {
  server,
};
