const { Router } = require('express');
const upload = require('../middlewares/uploadHandler.js');

const UploadController = require('../controllers/UploadController.js');
const QueryController = require('../controllers/QueryController.js');

const sheetRouter = Router();

sheetRouter.post('/upload', upload.single('sheet'), UploadController.upload);

sheetRouter.get('/query', QueryController.handleQuery);

module.exports = sheetRouter;
