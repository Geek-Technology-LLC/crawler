import { Driver } from "neo4j-driver";

/**
 *
 * @author B.Nyamkhuu
 */
class Neo4j {

  /**
   *
   * @param {Object} config
   */
  constructor(config) {
    this.config = config;
    this.conn = Driver();
  }

  /**
   * save data into database
   * @param {Object} template
   * @param {Object} data
   * @returns instance of Neo4j
   */
  saveWithTemplate(template, data) {
    return this;
  }
}

export default Neo4j;