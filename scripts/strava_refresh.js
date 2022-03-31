const https = require('https');
const { Pool } = require('pg');
const { user, host, database, password, port } = require('../config/db_config.json');

const db_pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

const select = 'SELECT * FROM users';

module.exports = {
    name: "strava_refresh.js",
    async execute(){
        try{
            db_pool.connect(function (err, db_client, done) {
                if (err){
                    return console.log(err);
                }
                
                db_client.query(select, (err, res) => {
                    if (err) {
                        return console.log(err);
                    }
                    if (res) {
                        for(let row of res.rows){

                            if (row.strava_expires_at < 3601) { //Laeuft token in weniger als einer Stunde ab?
                                const options = {
                                    hostname:  'www.strava.com',
                                    path: '/api/v3/oauth/token?client_id=68240&client_secret=4b4bfa0504aa728620139c88fcd58e731b506146&grant_type=refresh_token&refresh_token=' + row.strava_refresh_token,
                                    method: 'POST'
                                }
                                https.request(options, (response) => {
                                    var result = '';
                                    
                                    response.on('data', function(chunk) {
                                        result += chunk;
                                    });

                                    response.on('end', function () {
                                        if (result != null | result != ''){
                                            result = JSON.parse(result);

                                            let update = `UPDATE users SET strava_access_token = '` + result.access_token + `', strava_expires_at = '` + result.expires_in `', strava_refresh_token = '` + result.refresh_token + `' WHERE strava_id = '` + row.strava_id `'`;

                                            db_client.query(update, (err, res) => {
                                                if (err) {
                                                    return console.log(err);
                                                }
                                                if (res) {

                                                }
                                            })

                                        }
                                    })
                                })
                            }    
                        }
                    }
                })
                done();
            })
            
        }
        catch (err) {
            console.error(err);
        }
    }
}