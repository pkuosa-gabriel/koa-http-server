const debug = require('debug')('server:router');
const router = require('koa-router')();

const route = router.use('*', recv).get('*', hello);

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

module.exports = {
  route,
};
