import * as htmlParser from "node-html-parser";

/**
 * @author B.Nyamkhuu
 */
class TableParser {

  /**
   *
   * @param {String} data
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
    console.time("parse time");
    const result = [];
    for (let i = 0; i < allTable.length; i+=1) {
      const table = allTable[i];
      const headers = table.getElementsByTagName("th");
      const contents =table.getElementsByTagName("td");
      const tableData = [];
      const specialList = [];
      if (headers.length > 0) {
        const nth = contents.length / headers.length;
        console.log("header column count:", headers.length);
        console.log("content count:", contents.length, nth);
        for (let i = 0 ; i < nth; i+=1) {
          const singleData = {};
          for (let j = 0; j < headers.length; j+=1) {
            singleData[headers[j].innerText] = contents[j + i * headers.length].innerText;
            if (headers[j].innerText === "Регистр") {
              specialList.push(contents[j + i * headers.length].innerText);
            }
          }
          tableData.push(singleData);
        }
        if (tableData.length > 0) {
          console.log("TOTAL:", tableData.length);
          result.push(tableData);
          result.push(specialList);
        }
      }
    }
    console.timeEnd("parse time");
    return result;
  }

}

export default TableParser;