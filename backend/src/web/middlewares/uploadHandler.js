const multer = require('multer');
const path = require('path');

const { generateUniqueName } = require('../../application/utils/naming.js');

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

const upload = multer({
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = generateUniqueName();
      return callback(null, fileName);
    },
  }),
});

module.exports = upload;
