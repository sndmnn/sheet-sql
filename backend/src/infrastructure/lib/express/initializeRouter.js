const cors = require('cors');

const app = require('./app.js');

const sheetRouter = require('../../../web/routes/sheet.routes.js');

function initializeRouter() {
  app.use(cors());

  app.use('/sheet', sheetRouter);

  app.listen(3333, () => console.log('Server started on port 3333'));
}

module.exports = initializeRouter;
