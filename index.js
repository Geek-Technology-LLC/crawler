import TableParser from "./src/parsers/dom_parsers/table";
import Crawler from "./src/crawler";
import * as fs from "fs";
import Nats from "./src/connectors/nasts";
import * as dotenv from "dotenv";

// const crawler = new Crawler("opendata.burtgel.gov.mn", {}, {
//   method: "GET",
//   port  : 80,
//   path  : "/lesinfo/5721261"
// });
// crawler.startRequest().then((data) => {
//   const table = new TableParser(data, {});
//   const result = table.parse();
//   fs.writeFileSync("./test.json", JSON.stringify(result));
//   // console.log("result: ", result);
// });

dotenv.config();

const publisher = new Nats();
publisher.publish("TEST my first message", true);
const comsumer = new Nats();
comsumer.subscribe();
