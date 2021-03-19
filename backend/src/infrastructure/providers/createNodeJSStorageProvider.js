const fs = require('fs').promises;

const createNodeJSStorageProvider = () => {
  return {
    /**
     * Deletes the file located in the specified path
     *
     * @param {string} filePath
     */
    async deleteFile(filePath) {
      await fs.unlink(filePath);
    },
  };
};

module.exports = createNodeJSStorageProvider;
