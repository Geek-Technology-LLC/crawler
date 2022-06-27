import TableParser from "./src/parsers/dom_parsers/table";
import Crawler from "./src/crawler";

const crawler = new Crawler("opendata.burtgel.gov.mn", {}, {
  method: "GET",
  port  : 80,
  path  : "/lesinfo/5721261"
});
crawler.startRequest().then((data) => {
  const table = new TableParser(data, {});
  // console.log("result: ", result);
});
