const debug = require('debug')('server:index');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const render = require('koa-ejs');
const serve = require('koa-static');
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
app.use(koaBody({multipart: true}));
app.use(serve(path.join(__dirname, '/public')));
app.use(route.routes());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`Server is running on ${port}.`);
});

module.exports = {
  server,
};
