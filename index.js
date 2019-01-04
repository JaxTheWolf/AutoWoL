const scanner = require(`local-network-scanner`);
const { devName } = require(`./conf.json`);
let cron = require(`cron`);
let now = Date();

let cronJob = cron.job("0 */10 * * * *", function(devName) {
  scanner.scan(
    {
      arguments: [`-I`, devName]
    },
    devices => {
      console.log(devices);
    }
  );
});

console.log(now);
