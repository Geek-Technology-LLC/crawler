import * as https from "https"
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
        this.url = baseUrl
        this.targets = targets
        this.config = config
        this._startRequest()
    }

    getData() {
    }

    /**
     * 
     * @param {String} data 
     */
    _saveInfo(data) {

    }

    /**
     * if request is succeed, it will call callback function
     * @param {Function} callback - function
     */
    _startRequest(callback) {
        console.log("🚀 Request started!")
        const options = {
            hostName: this.url,
            method: this.config?.method || "GET",
            path: this.config?.path || "/",
            port: this.config?.port || 80
        }
        const request = https.request(options, res => {
            res.on("data", data => {
                const resInfo = {
                    statusCode: res?.statusCode,
                    responseTime: res?.responseTime,
                    contentLength: res?.contentLength
                }
                console.log("fetched HTML content")
                console.table(resInfo)
                callback(data)
            })
        })
        request.on("error", error => {
            console.log("Error occured!", error)
            return null
        })
        request.end()
        console.log(" Request finished! 🚀")
    }
}

export default Crawler;