const debug = require('debug')('server:index');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
  debug('"Hello World" sent');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`server is running on ${port}`);
});

module.exports = {
  server,
};
