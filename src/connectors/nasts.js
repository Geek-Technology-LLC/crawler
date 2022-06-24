import { connect, StringCodec } from "nats";

/**
 * Nats client base class
 * @author B.Nyamkhuu
 * @see https://github.com/nats-io/nats.js
 *
 * MIT licensed
 */
class Nats {

  constructor() {
    this.subject = "crawler";
    const natsHost = process.env.NATS_SERVER;
    if (!natsHost) {
      throw new Error("NATS SERVER DOES NOT DEFINED");
    }
    this.natsHost = natsHost;
  }

  async init() {
    this.connection = await connect({ servers: this.natsHost });
  }

  /**
   *
   * @param {String} subject
   */
  changeDefaultSubject(subject) {
    this.subject = subject;
  }

  /**
   *
   * @param {String | Number | Object} message
   * @param {Boolean} isDebug - default value is false
   */
  publish(message, isDebug = false) {
    try {
      this.connection.publish(this.subject, StringCodec().encode(message));
    } catch (error) {
      if (isDebug) {
        console.log(error);
      }
      throw new Error("COULD NOT PUBLISH MESSAGE!");
    }
  }
}

export default Nats;