const LedStrip = require('../modules/LedStrip');
const led = new LedStrip(54, 0);
module.exports.led = led;

const SqliteQuery = require('../modules/SqliteQuery');
const query = new SqliteQuery('schedule.db');
module.exports.query = query;

const Schedule = require('../modules/Schedule');
const sched = new Schedule();
module.exports.schedule = sched;

const PlantRelay = require('../modules/Relay');
const relay = new PlantRelay(17);
module.exports.plantrelay = relay;