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
    this.subject = "crawler"
    const nats_host = process.env.NATS_SERVER
    if (!nats_host) {
      throw new Error("NATS SERVER DOES NOT DEFINED")
    }

    this.connection = await connect({ servers: nats_host })
  }

  changeDefaultSubject(subject) {
    this.subject = subject
  }
}

export default Nats