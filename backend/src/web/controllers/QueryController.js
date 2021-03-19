const services = require('../../application/services/services.js');

const QueryController = {
  async handleQuery(request, response) {
    const { query } = request.body;

    const queryResult = await services('ExecuteClientQueryService').execute(
      query
    );

    return response.status(200).json(queryResult);
  },
};

module.exports = QueryController;
