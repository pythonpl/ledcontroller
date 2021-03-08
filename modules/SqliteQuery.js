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

    getWholeSchedule = async function(){
        let rows = await this.query('SELECT * FROM scheduleData');
        return rows;
    }

    deleteSchedulePosition = async function(id){
        await this.query('DELETE FROM scheduleData WHERE ID = ?', [id])
    }

    insertSchedulePosition = async function(type, onetime, date){
        await this.query('INSERT INTO scheduleData VALUES (NULL, ?, ?, ?)', [type, date, onetime]);
    }
}

module.exports = SqliteQuery;