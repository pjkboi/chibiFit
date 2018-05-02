
/**
 * File Name: chibiFitDAL.js
 *
 * Revision History:
 *       Pj & Tuan, 2018-04-22 : Created
 */

var journalEntries = {
    insert: function (options, callback) {

        function txFunction(tx) {
            var sql = "INSERT INTO journalEntries(name, height, weight, BMI, date, typeId) values(?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Insert Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM journalEntries;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select All Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM journalEntries WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select All Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE journalEntries SET name=?, height=?, weight=?, bmi=?, date=?, typeId=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select All Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM journalEntries WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select All Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var muscleGroup ={
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM muscleGroup;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select All Transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};




