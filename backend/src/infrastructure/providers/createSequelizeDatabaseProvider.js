const { sequelize, Sequelize } = require('../lib/sequelize/index.js');

const createSequelizeDatabaseProvider = () => {
  /**
   * A dictionary of query builders. The keys are SQL operation types and the values are functions responsible for building a query for that operation
   */
  const queryBuilders = {
    INSERT: ({ tableName, tableColumns, content }) => {
      const columns = tableColumns.map(column => `"${column}"`);

      const values = content.map(line => {
        const lineArray = line.map(
          (column, index) => `${index < 1 ? '' : ','}'${column}'`
        );

        const lineString = lineArray.join('');

        return `(${lineString})`;
      });

      const sql =
        `INSERT INTO ${tableName} (${columns.join()}) ` +
        `VALUES ${values.join()}`;

      return sql;
    },
  };

  /**
   * Function responsible for interfacing with the query builder dictionary. It retrieves the query builder function from the dictionary and calls it with the specified parameters
   *
   * @param {'INSERT' | 'DELETE' | 'SELECT' | 'UPDATE'} queryType a SQL operation type
   * @param {Record<string, unknown>} queryParams parameters to be injected on the query builder function
   *
   * @returns {void}
   */
  function buildQuery(queryType, queryParams) {
    return queryBuilders[queryType](queryParams);
  }

  /**
   * Converts a matrix into an `object` array
   *
   * @param {string[]} tableColumns an array containing the matrix column headers. Will be used as keys for the object properties
   * @param {unknown[][]} content a matrix containig data
   *
   * @return {Record<string, unknown>[]} an array containing objects (each object represents a matrix rows)
   */
  function contentMatrixToObjectArray(tableColumns, content) {
    const entryArray = [];

    content.forEach(row => {
      const object = {};

      row.forEach((cell, index) => {
        object[tableColumns[index]] = cell;
      });

      entryArray.push(object);
    });

    return entryArray;
  }

  return {
    /**
     * Creates a new table in the database
     *
     * @param {Array<{ name: string, type: string }>} columns array of objects used to define column names and types
     */
    async createTable(tableName, columns) {
      const dbTableName = `${tableName || 'table'}_${Date.now()}`;

      const attributes = {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
        },
      };

      columns.forEach(column => {
        const columnAttributes = {};

        Object.entries(column).forEach(([key, value]) => {
          if (key !== 'name' && key !== 'type') columnAttributes[key] = value;
          else columnAttributes[key] = Sequelize[value];
        });

        attributes[column.name] = columnAttributes;
      });

      const model = sequelize.define(dbTableName, attributes, {
        tableName: dbTableName,
        timestamps: false,
      });

      await model.sync();

      return dbTableName;
    },

    /**
     * Populates a table in the database
     *
     * @param {string} tableName name of the table to be populated
     * @param {Array<Array<string>>} content a matrix containing the data to be inserted into the database
     */
    async populateTable(tableName, tableColumns, content) {
      const queryInterface = sequelize.getQueryInterface();

      const bulkArray = contentMatrixToObjectArray(tableColumns, content);

      queryInterface.bulkInsert(tableName, bulkArray);
    },

    /**
     * Executes a single raw SQL query on the database
     *
     * @param {string} query SQL query to be executed
     */
    async executeQuery(query) {
      const result = await sequelize.query(query);

      return result;
    },
  };
};

module.exports = createSequelizeDatabaseProvider;
