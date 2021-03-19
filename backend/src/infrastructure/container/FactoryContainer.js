const { asFunction } = require('awilix');

const container = require('../lib/awilix/container.js');

const FactoryContainer = {
  /**
   * Register a factory. A new object will be created whenever this factory is resolved
   *
   * @param {string} factoryId name that will be used to resolve the factory
   * @param {function} factory factory function to be registered
   */
  registerFactory(factoryId, factory) {
    container.register({
      [factoryId]: asFunction(factory),
    });
  },

  /**
   * Register a factory as a singleton. The same object will be used whenever this factory is resolved
   *
   * @param {string} factoryId name that will be used to resolve the factory
   * @param {function} factory factory function to be registered
   */
  registerFactorySingleton(factoryId, factory) {
    container.register({
      [factoryId]: asFunction(factory, {
        lifetime: 'SINGLETON',
      }),
    });
  },

  /**
   * Resolves a previously registered factory. Trying to resolve a non existing factory will throw an error
   *
   * @param {string} factoryId name with which the object was registered
   */
  resolveFactory(factoryId) {
    return container.resolve(factoryId);
  },
};

module.exports = FactoryContainer;
