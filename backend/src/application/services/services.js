const FactoryContainer = require('../../infrastructure/container/FactoryContainer.js');

/**
 * Acts as a service factory. Receives a service identifier as a parameter and returns a service object with an `execute` method
 *
 * @param {string} serviceId name with which the object was registered in the `FactoryContainer`
 */
const services = serviceId => FactoryContainer.resolveFactory(serviceId);

module.exports = services;
