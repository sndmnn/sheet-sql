const services = require('./services.js');

const createHandleUploadService = ({ sheetProviderDep }) => {
  const sheetProvider = sheetProviderDep;

  return {
    async execute({ file, tableName }) {
      await sheetProvider.setSheet(file.path);

      const sheetHeaders = sheetProvider.getWorksheetHeaders(tableName);
      const sheetContent = sheetProvider.getWorksheetContent(tableName, {
        stringified: true,
      });

      const dbTableName = await services(
        'CreateDatabaseCustomTableService'
      ).execute(tableName, sheetHeaders);

      await services('PopulateDatabaseCustomTableService').execute(
        dbTableName,
        sheetHeaders,
        sheetContent
      );

      await services('DeleteFileService').execute(file.path);

      return dbTableName;
    },
  };
};

module.exports = createHandleUploadService;
