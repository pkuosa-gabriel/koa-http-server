const debug = require('debug')('server:router');

/**
 * A custom router
 * @param {string} pathName
 */
function route(pathName) {
  debug(`About to route a request for ${pathName}`);
}

module.exports = {
  route,
};
