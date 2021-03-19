const createPopulateDatabaseCustomTableService = ({ databaseProviderDep }) => {
  const databaseProvider = databaseProviderDep;

  return {
    /**
     * Starts service execution
     *
     * @param {string} tableName name of the table to populate
     * @param {Array<string>} tableColumns table columns names
     * @param {Array<Array<string>>} content content used to populate the table
     */
    async execute(tableName, tableColumns, content) {
      await databaseProvider.populateTable(tableName, tableColumns, content);
    },
  };
};

module.exports = createPopulateDatabaseCustomTableService;
