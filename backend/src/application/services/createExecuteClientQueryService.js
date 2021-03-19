const createExecuteClientQueryService = ({ databaseProviderDep }) => {
  const databaseProvider = databaseProviderDep;

  return {
    async execute(query) {
      const queryResult = await databaseProvider.executeQuery(query);

      return queryResult;
    },
  };
};

module.exports = createExecuteClientQueryService;
