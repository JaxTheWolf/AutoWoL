const { trigger, toWake, hoursMin, hoursMax } = require(`./conf.json`);
const wol = require(`wol`);
let ping_ = require(`net-ping`);
let session = ping_.createSession();

function timeChecker() {
  const now = new Date();
  return now.getHours() >= hoursMin && now.getHours() < hoursMax;
}

function ping(ip, toWake) {
  session.pingHost(ip, function(error, target) {
    if (error) {
      console.log(`${target}: ` + error.toString());
    } else {
      console.log(`${target}: Alive`);
      if (timeChecker()) {
        wol.wake(toWake, function(err, res) {
          if (err) console.log(`ERR! ${err}`);
          else console.log(`RES! ${res}`);
        });
      } else {
        console.log(`nope`);
      }
    }
  });
}

setInterval(ping, 300000, trigger, toWake);
