const debug = require('debug')('server:index');
const Koa = require('koa');
const favicon = require('koa-favicon');
const app = new Koa();

const {route} = require('./router');

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(async (ctx) => {
  debug(`Request for ${ctx.path} received.`); // Output the requested path.
  route(ctx.path);
  ctx.body = 'Hello World';
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`Server is running on ${port}.`);
});

module.exports = {
  server,
};
