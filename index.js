const scanner = require(`local-network-scanner`);
const { devName, trigger, toWake } = require(`./conf.json`);
const wol = require(`wol`);
let cron = require(`cron`);

function timeChecker() {
  const now = new Date();
  return now.getHours() >= 12 && now.getHours() < 16;
}

function wakeNow(triggerMac, dev, wake) {
  scanner.scan({ arguments: [`-I`, dev] }, devices => {
    if (triggerMac in devices) {
      wol.wake(wake, function(err, res) {
        if (err) {
          console.log(err);
        } else {
        }
        console.log(res);
      });
    }
  });
}

function checkStatus() {
  if (timeChecker()) wakeNow(trigger, devName, toWake);
}

setInterval(checkStatus, 300000);
