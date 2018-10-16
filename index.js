const debug = require('debug')('server:index');
const Koa = require('koa');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const app = new Koa();
const {route} = require('./router');

app.use(logger());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(route.routes());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`Server is running on ${port}.`);
});

module.exports = {
  server,
};
