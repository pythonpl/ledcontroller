var sqlite3 = require('sqlite3').verbose();
class SqliteQuery {
    constructor(path) {
        var userDB = new sqlite3.Database(path, async (err) => {
            if (err) {
                console.error(err.message);
            } else {
                this.connection = userDB;
            }
        });
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.all(sql, params, (err, rows) => {
                if (err)
                    reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    }

    getWholeSchedule(){
        return new Promise(async (res, rej) => {
            try{
                let rows = await this.query('SELECT * FROM scheduleData');
                res(rows);
            }catch(e){
                rej(e);
            }
        })
    }

    deleteSchedulePosition(id){
        return new Promise(async (res, rej) => {
            try{
                await this.query('DELETE FROM scheduleData WHERE ID = ?', [id]);
            }catch(e){
                rej(e);
            }
            res(true);
        })
    }

    insertSchedulePosition(type, onetime, date){
        return new Promise(async (res, rej) => {
            try{
                await this.query('INSERT INTO scheduleData VALUES (NULL, ?, ?, ?)', [type, date, onetime]);
            }catch(e){
                rej(e);
            }
            res(true);
        })    
    }
}

module.exports = SqliteQuery;