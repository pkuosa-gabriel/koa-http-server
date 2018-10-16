const debug = require('debug')('server:router');
const router = require('koa-router')();

const route = router.use('*', recv)
  .get('home', '/', home)
  .get('about', '/about', about)
  .get('github', '/github', github)
  .get('not found', '*', fallback);

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
 * Handle home
 * @param {*} ctx
 */
async function home(ctx) {
  ctx.body = 'Hello World';
}

/**
 * Handle about
 * @param {*} ctx
 */
async function about(ctx) {
  ctx.body = 'This is a simple http-server powered by koa.js';
}


/**
 * Redirect to github
 * @param {*} ctx
 */
async function github(ctx) {
  ctx.redirect('https://github.com/pkuosa-gabriel/koa-http-server');
}

/**
 * Fallback for routes not found
 * @param {*} ctx
 */
async function fallback(ctx) {
  ctx.status = 404;
  ctx.body = 'Maybe you have entered a wrong path';
}

module.exports = {
  route,
};
