const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (messages , logFileName) => {

    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${messages}`
    try {
        if(!fs.existsSync(path.join(__dirname, '..' , 'logs'))){
            await fsPromises.mkdir(path.join(__dirname , ".." , 'logs'))
        }


        await fsPromises.appendFile(
            path.join(__dirname , ".." , "logs" , logFileName),
            logItem
        )
    } catch (error) {
        console.log(`${error}.bgRed`)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`.bgBlue);
    next();
}

module.exports = {logger , logEvents}