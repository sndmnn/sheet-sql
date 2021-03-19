const services = require('../../application/services/services.js');

const UploadController = {
  async upload(request, response) {
    const { file, body } = request;

    const responseData = await services('HandleUploadService').execute({
      file,
      tableName: body.table_name,
    });

    return response.status(200).json(responseData);
  },
};

module.exports = UploadController;
