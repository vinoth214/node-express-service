/**
 * Created by 983825 on 8/8/2016.
 */

var winston = require('winston');
var winston = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        new (winston.transports.File)({ filename: __dirname + './../../logs/ewiggle_node.log', level: 'debug' })
    ]
});
winston.info('welcome to Ewiggle_node log file ');
module.exports = winston;
