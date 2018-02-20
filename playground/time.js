const moment = require('moment');

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var timestamp = 1234;
var date = moment(timestamp);
console.log(moment().format('h:mm a'));