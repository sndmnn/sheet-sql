# Sheet Sequelizer Backend

This code is responsible for handling client requests by reading spreadsheet files (only XLSX securely at the moment - support for the broader CSV format is still to be tested) and indexing the information on a database, thus enabling the user to query saved data via SQL.

This project is built atop of [Sequelize][1] and [ExcelJS][2].

[1]: https://github.com/sequelize/sequelize
[2]: https://github.com/exceljs/exceljs

## Important Notes

- The `config` folder only contains template files. In order to run the code you should remove the `-template` suffix on these files and fill them with information specific to your environment (like database credentials, port etc.)

- Refer to the [Migration#configuration section from  Sequelize Manual][3] for detailed explanation on how to fill the `database.json` file

[3]: https://sequelize.org/master/manual/migrations.html#configuration
