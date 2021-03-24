const nodeschedule = require('node-schedule');
const db = require('../obj/objects').query;
const STATES = require('./States').Schedule;

class Schedule {

    constructor() {
        this.scheduleList = [];
        setTimeout(()=>{ this.updateSchedule(); }, 1200)
    }

    // Update schedule after change
    updateSchedule = async function () {        
        for(let i = 0; i<this.scheduleList.length; i++){
            this.scheduleList[i].cancel();
        }
        this.scheduleList = [];
        let rows = await db.getWholeSchedule();

        for (let id in rows) {
            if (rows[id].oneTime && new Date(rows[id].scheduleTime) < new Date()) {
                await db.deleteSchedulePosition(rows[id].ID);
            } else {
                if (rows[id].scheduleType == STATES.START) {
                    let sched = nodeschedule.scheduleJob(rows[id].scheduleTime, () => {
                        (require('../obj/objects').plantrelay).set();
                        this.updateSchedule();
                    });
                    this.scheduleList.push(sched);
                } else {
                    let sched = nodeschedule.scheduleJob(rows[id].scheduleTime, () => {
                        (require('../obj/objects').plantrelay).reset();
                        this.updateSchedule();
                    });
                    this.scheduleList.push(sched);
                }
            }
        }
    }

    // Insert new schedule to DB and update schedule
    insertNewSchedule = async function(type, oneTime, date){
        type = type == 'on' ? STATES.START : STATES.STOP;
        if(!(oneTime=='true')){
            let temp = date.split(':');
            date = temp[1] + ' ' + temp[0] + ' * * *';
        }
        await db.insertSchedulePosition(type, oneTime, date);
        await this.updateSchedule();
    }

    // Cancel scheduled event
    cancelSchedule = async function(id){
        await db.deleteSchedulePosition(id);
        await this.updateSchedule();
    }

}

module.exports = Schedule;