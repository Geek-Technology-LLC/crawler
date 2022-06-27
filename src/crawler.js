import * as https from "https";
import * as http from "http";
/**
 * Crawler base class
 * @author B.Nyamkhuu
 *
 * MIT licensed
 */
class Crawler {

  /**
     * @param {String} url - website url as string
     * @param {Object} targets - targeted HTML element info as json object
     * @param {Object} config - crawler options as json object
     */
  constructor(baseUrl, targets, config) {
    this.url = baseUrl;
    this.targets = targets;
    this.config = config;
  }

  /**
     * if request is succeed, it will call callback function
     * @param {Function} callback - function
     */
  async startRequest() {
    console.log("🚀 Request started!");
    const options = {
      hostname: this.url,
      method  : this.config.method || "GET",
      path    : this.config.path || "/",
      port    : this.config.port || 80
    };
    const requester = http;
    if (this.config.isSsl) {
      requester = https;
    }
    return new Promise((resolve, reject) => {
      requester.request(options, res => {
        let body = "";
        res.on("data", chunk => {
          body +=chunk.toString();
        });
        res.on("end", () => {
          const resInfo = {
            statusCode: res.statusCode,
          };
          console.log("fetched HTML content");
          console.table(resInfo);
          console.log(" Request finished! 🚀");
          resolve(body);
        });
        res.on("error", error => {
          console.log("Error occured!", error);
          reject(error);
        });
      }).end();
    });
  }
}

export default Crawler;