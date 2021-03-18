const registerDependencies = require('../application/container/registerDependencies.js');
const initializeRouter = require('../infrastructure/lib/express/initializeRouter.js');

const Server = {
  /**
   * Registers dependencies and loads all aplication routes
   */
  initialize() {
    registerDependencies();
    initializeRouter();
  },
};

module.exports = Server;
