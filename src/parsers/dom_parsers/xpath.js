import { DOMParser } from "xmldom";
import { select } from "xpath";

/**
 *
 * @author B.Nyamkhuu
 */
class XPath {

  /**
   *
   * @param {Object} params
   */
  constructor(params) {
    this.params = params;
  }

  /**
   *
   * @param {String} data
   * @returns {Object} result
   */
  toJSON(data) {
    const result = {};
    const doc = new DOMParser().parseFromString(data);

    let keys = Object.keys(this.params);
    for (let i = 0; i < keys.length; i+=1) {
      const key = keys[i];
      const selected = select(key.xpath, doc);
      result[key.name] = selected.length > 0 ? selected[0].firstChild.data : null;
    }
    return result;
  }
}

export default XPath;