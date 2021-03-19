const createCreateDatabaseCustomTableService = ({ databaseProviderDep }) => {
  const databaseProvider = databaseProviderDep;

  return {
    async execute(tableName, columnNames) {
      // All columns are created as strings to prevent data type
      // inferring errors due to inconsistent table data types
      // on the same column
      const columns = columnNames.map(value => ({
        name: value,
        type: 'TEXT',
      }));

      const createdTableName = await databaseProvider.createTable(
        tableName,
        columns
      );

      return createdTableName;
    },
  };
};

module.exports = createCreateDatabaseCustomTableService;
