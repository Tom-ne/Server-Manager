const moment = require('moment')

module.exports = class ConsoleLogger {
    static log(content, type) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;

        if(!type) {
            type = "none"
        }
        
        return console.log(`[${date}]: [${type.toUpperCase()}] ${content}`);
    }
}