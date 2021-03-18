const FactoryContainer = require('../../infrastructure/container/FactoryContainer.js');

const createHandleUploadService = require('../services/createHandleUploadService.js');
const createCreateDatabaseCustomTableService = require('../services/createCreateDatabaseCustomTableService.js');
const createPopulateDatabaseCustomTableService = require('../services/createPopulateDatabaseCustomTableService.js');
const createDeleteFileService = require('../services/createDeleteFileService.js');
const createExecuteClientQueryService = require('../services/createExecuteClientQueryService.js');

const createExcelJSSheetProvider = require('../../infrastructure/providers/createExcelJSSheetProvider.js');
const createSequelizeDatabaseProvider = require('../../infrastructure/providers/createSequelizeDatabaseProvider.js');
const createNodeJSStorageProvider = require('../../infrastructure/providers/createNodeJSStorageProvider');

function registerDependencies() {
  // Service registration
  FactoryContainer.registerFactorySingleton(
    'HandleUploadService',
    createHandleUploadService
  );

  FactoryContainer.registerFactorySingleton(
    'CreateDatabaseCustomTableService',
    createCreateDatabaseCustomTableService
  );

  FactoryContainer.registerFactorySingleton(
    'PopulateDatabaseCustomTableService',
    createPopulateDatabaseCustomTableService
  );

  FactoryContainer.registerFactorySingleton(
    'DeleteFileService',
    createDeleteFileService
  );

  FactoryContainer.registerFactorySingleton(
    'ExecuteClientQueryService',
    createExecuteClientQueryService
  );

  // Provider registration
  FactoryContainer.registerFactory(
    'sheetProviderDep',
    createExcelJSSheetProvider
  );

  FactoryContainer.registerFactory(
    'databaseProviderDep',
    createSequelizeDatabaseProvider
  );

  FactoryContainer.registerFactory(
    'storageProviderDep',
    createNodeJSStorageProvider
  );
}

module.exports = registerDependencies;
