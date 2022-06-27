import * as htmlParser from "node-html-parser";

/**
 * @author B.Nyamkhuu
 */
class TableParser {

  /**
   *
   * @param {Object} params
   */
  constructor(data, params) {
    this.params = params;
    this.data = data;
  }

  parse() {
    const root = htmlParser.parse(this.data);
    const allTable = root.getElementsByTagName("table");
    console.log(`${allTable.length} table found from HTML document`);
    const result = [];
    for (let i = 0; i < allTable.length; i+=1) {
      const table = allTable[i];
      const headers = table.getElementsByTagName("th");
      const contents =table.getElementsByTagName("td");
      const tableData = [];
      const nth = contents.length / headers.length;

      for (let i = 0 ; i < nth; i+=1) {
        const singleData = {};
        for (let j = 0; j < headers.length; j+=1) {
          singleData[headers[j].innerText] = contents[j + i * headers.length].innerText;
        }
        tableData.push(singleData);
      }
      result.push(tableData);
    }
    return result;
  }

}

export default TableParser;