const path = require('path');
const fs = require('fs');

const logsFolder = path.resolve(__dirname, '..', '..', '..', '..', 'logs');

function sequelizeLogger(msg) {
  fs.writeFile(
    path.resolve(logsFolder, `sequelize_${Date.now()}.log`),
    msg,
    err => {
      if (err) throw err;
    }
  );
}

module.exports = sequelizeLogger;
