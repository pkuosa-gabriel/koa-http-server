const debug = require('debug')('server:router');
const router = require('koa-router')();

const route = router.use('*', recv)
  .get('/', hello)
  .get('/home', home);

/**
 * Before routing
 * @param {*} ctx
 * @param {*} next
 */
async function recv(ctx, next) {
  debug(`Request for ${ctx.path} received.`);
  await next();
}

/**
 * Handle hello world.
 * @param {*} ctx
 */
async function hello(ctx) {
  debug(`About to route a request for ${ctx.path}`);
  ctx.body = 'Hello World';
}

/**
 * Handle home
 * @param {*} ctx
 */
async function home(ctx) {
  ctx.body = 'This is a simple http-server powered by koa.js';
}

module.exports = {
  route,
};
