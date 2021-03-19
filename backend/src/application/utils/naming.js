const crypto = require('crypto');
const uuid = require('uuid');

/**
 * Generates a new random file name
 *
 * @param {number} bytes number of bytes to be generated
 * @param fileExt Extension of the file to be included in the name
 * @returns {string} string form of the generated name
 *
 * @example
 * generateHashName() // '96394623aae6b289b5aa.mp4'
 */
const generateHashName = (bytes = 16, fileExt = 'xlsx') => {
  const randomName = crypto.randomBytes(bytes).toString('hex');

  return `${randomName}.${fileExt}`;
};

/**
 * Generates a new unique file name
 *
 * @param {number} uuidVersion UUID version to be used in the name generation
 * @param {string} fileExt Extension of the file to be included in the name
 * @returns {string} string form of the generated name
 *
 * @example
 * generateUniqueName() // '21bf2e51-b84a-4850-9951-71da0cb013d3.mp4'
 */
const generateUniqueName = (uuidVersion = 4, fileExt = 'xlsx') => {
  if (![1, 2, 3, 4, 5].includes(uuidVersion)) {
    throw new Error('Invalid uuid version');
  }

  const version = `v${uuidVersion}`;
  const uniqueName = uuid[version]();

  return `${uniqueName}.${fileExt}`;
};

const generateUuidName = (uuidVersion = 4) => uuid[`v${uuidVersion}`]();

module.exports = {
  generateHashName,
  generateUniqueName,
  generateUuidName,
};
