import { connect, StringCodec } from "nats";

/**
 * Nats client base class
 * @author B.Nyamkhuu
 * @see https://github.com/nats-io/nats.js
 *
 * MIT licensed
 */
class Nats {

  constructor(config = {}) {
    this.subject = "crawler";
    const natsHost = process.env.NATS_SERVER;
    if (!natsHost) {
      throw new Error("NATS SERVER DOES NOT DEFINED");
    }
    this.natsHost = natsHost;
    this.config = config;
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
  async publish(message, isDebug = false) {
    if (!this.connection) {
      await this.init();
    }
    try {
      this.connection.publish(this.subject, StringCodec().encode(message));
    } catch (error) {
      if (isDebug) {
        console.log(error);
      }
      throw Error("COULD NOT PUBLISH MESSAGE!");
    }
  }

  async subscribe() {
    if (!this.connection) {
      await this.init();
    }
    const encoder = StringCodec();
    const subject = this.connection.subscribe(this.subject);
    // eslint-disable-next-line no-restricted-syntax
    for await (const message of subject) {
      this._worker(encoder.decode(message.data));
    }
  }

  _worker(decodedMessage) {
    console.log("Decoded message:", decodedMessage);
    if (this.config.method === "FILE") {
      console.log("SUBSCRIBER", "File based file saving ...");
    }
  }
}

export default Nats;