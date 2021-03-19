const createDeleteFileService = ({ storageProviderDep }) => {
  const storageProvider = storageProviderDep;

  return {
    async execute(filePath) {
      await storageProvider.deleteFile(filePath);
    },
  };
};

module.exports = createDeleteFileService;
