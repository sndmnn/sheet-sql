/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelizeConfig = require('../../../../config/database.json');
const sequelizeLogger = require('./logger.js');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    logging: sequelizeLogger,
    ...config,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    logging: sequelizeLogger,
    ...config,
  });
}

fs.readdirSync(`${__dirname}/models`)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
