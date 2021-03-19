const exceljs = require('exceljs');

const createExcelJSSheetProvider = () => {
  return {
    /**
     * Sets the sheet from which information will be extracted
     *
     * @param {string} sheetPath path to the sheet file
     */
    async setSheet(sheetPath) {
      const fileExtension = sheetPath.split('.')[1];

      const excelSheet = new exceljs.Workbook();

      this.workBook = await excelSheet[fileExtension].readFile(sheetPath);
    },

    getWorksheetHeaders(worksheetName) {
      const worksheet = this.workBook.getWorksheet(worksheetName);
      const row = worksheet.getRow(1);

      const headers = [];

      row.eachCell(cell => {
        headers.push(cell.value);
      });

      return headers;
    },

    /**
     * Iterates through the worksheet content and maps it as a matrix
     *
     * @param {string} worksheetName name of the worksheet inside the file to be mapped
     * @param {number} startRow row to start iterating (defaults to 2 because the 1st row usually represents the content headers)
     * @param {boolean} stringified boolean value indicating if content should be parsed to string
     */
    getWorksheetContent(worksheetName, { startRow = 2, stringified = false }) {
      const worksheet = this.workBook.getWorksheet(worksheetName);

      const sheetMatrix = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber < startRow) return;

        const rowArray = [];

        row.eachCell(cell =>
          rowArray.push(stringified ? `${cell.value}` : cell.value)
        );

        sheetMatrix.push(rowArray);
      });

      return sheetMatrix;
    },
  };
};

module.exports = createExcelJSSheetProvider;
