/**
 * File Name: database.js
 *
 * Revision History:
 *       Pj & Tuan, 2018-04-22 : Created
 */
var db;

function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB =  {
    createDatabase: function(){
        var shortName = "ChibiFitDB";
        var version = "1.0";
        var displayName = "DB for ChibiFitDB app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {

        function txFunction(tx) {
            var dropmuscles = "DROP TABLE IF EXISTS muscleGroup;";
            var sqlmuscles = "CREATE TABLE IF NOT EXISTS muscleGroup(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "muscleGroup VARCHAR(20) NOT NULL) ";
            var insert1 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Chest');";
            var insert2 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Back');";
            var insert3 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Legs');";
            var insert4 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Biceps');";
            var insert5 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Triceps');";
            var insert6 = "INSERT INTO muscleGroup(muscleGroup) VALUES('Core');";


            var sql = "CREATE TABLE IF NOT EXISTS journalEntries(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(20) NOT NULL, " +
                "height INTEGER," +
                "weight INTEGER,"+
                "bmi INTEGER,"+
                "date VARCHAR(20),"+
                "typeId INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES muscleGroup(id))";
            var options = [];

            function successCreateUserAccount() {
                console.info("Success: Journal Entries table creation successful");
            }
            tx.executeSql(dropmuscles, options, successCreateUserAccount, errorHandler);
            tx.executeSql(sqlmuscles, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert1, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert2, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert3, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert4, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert5, options, successCreateUserAccount, errorHandler);
            tx.executeSql(insert6, options, successCreateUserAccount, errorHandler);

            tx.executeSql(sql, options, successCreateUserAccount, errorHandler);

        }
        function successTransaction() {
            console.info("Success: Create table transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS journalEntries;";
            var sql1 = "DROP TABLE IF EXISTS muscleGroup;";
            var options = [];
            function successDrop() {
                console.info("Success: Dropping Tables successful.");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
            tx.executeSql(sql1, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Table drop transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};