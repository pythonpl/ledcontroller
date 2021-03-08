const nodeschedule = require('node-schedule');
const db = require('./obj/objects').query;
const STATES = require('./States').Schedule;

class Schedule {

    constructor() {
        this.scheduleList = [];
    }

    // Update schedule after change
    updateSchedule = async function () {
        console.log('Updating schedule...');
        this.scheduleList.forEach((element) => { element.cancel() })
        this.scheduleList = [];
        let rows = await db.getWholeSchedule();

        for (id in rows) {
            if (rows[id].oneTime && new Date(rows[id].scheduleTime) < new Date()) {
                await db.deleteSchedulePosition(rows[id].ID)
            } else {
                if (rows[id].scheduleType == STATES.START) {
                    let sched = nodeschedule.scheduleJob(rows[id].scheduleTime, function () {
                        // RELAY ON
                        console.log('ON RELAY');
                        updateSchedule();
                    });
                    scheduleList.push(sched);
                } else {
                    let sched = nodeschedule.scheduleJob(rows[id].scheduleTime, function () {
                        // RELAY OFF
                        console.log('OFF RELAY');
                        updateSchedule();
                    });
                    scheduleList.push(sched);
                }
            }
        }
    }

    // Insert new schedule to DB and update schedule
    insertNewSchedule = async function(type, oneTime, date){
        let type = type == 'on' ? STATES.START : STATES.STOP;
        await db.insertNewSchedule(type, oneTime, date);
        this.updateSchedule();
    }

}

module.exports = Schedule;