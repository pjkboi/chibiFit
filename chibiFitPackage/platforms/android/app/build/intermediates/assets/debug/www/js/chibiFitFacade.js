/**
 * File Name: chibiFitFacade.js
 *
 * Revision History:
 *       Pj & Tuan, 2018-04-22 : Created
 */
function showDate() {
    var d = new Date();
    $("#txtDate").val(d.toDateString());
    $("#txtDateUpdate").val(d.toDateString());
}
function showDateUpdate() {
    var d = new Date();
    $("#txtDateUpdate").val(d.toDateString());
}

function calculateBMI() {
    var height = $("#txtHeight").val();
    var weight = $("#txtWeight").val();
    var variable = 0.01;
    var BMI = Math.round(weight/((variable*height)*(variable*height)));
    $("#txtBMI").val(BMI);
}
function calculateupdateBMI() {
    var height = $("#txtupdateHeight").val();
    var weight = $("#txtupdateWeight").val();
    var variable = 0.01;
    var BMI = Math.round(weight/((variable*height)*(variable*height)));
    $("#txtupdateBMI").val(BMI);
}
function addEntry() {
    var options = [];
    if (doValidate_newJournalEntryFrm()) {
        // 2. if successful then fetch inputs
        var name = $("#txtName").val();
        var height = $("#txtHeight").val();
        var weight = $("#txtWeight").val();
        var BMI = $("#txtBMI").val();
        var date = $("#txtDate").val();
        var muscleGroup = $("#listExercise").val();
        console.info("Inserting");

        // 3. insert (call DAL function by supplying inputs)
        options = [name, height, weight, BMI, date, muscleGroup];
        function callback() {
            console.info("Record inserted successfully");
            alert("New Entry added.");
            $.mobile.changePage("#journalPage", {transition: 'slide'});
        }
        journalEntries.insert(options, callback);
    }
    else{
        console.error("Validation failed");
    }
}

function showAll() {
    var options = [];
    function callback(tx, results) {

        var html = "";
        var muscleGroup = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            switch (row['typeId']){
                case 1:
                    muscleGroup = "Chest";
                    break;
                case 2:
                    muscleGroup = "Back";
                    break;
                case 3:
                    muscleGroup = "Legs";
                    break;
                case 4:
                    muscleGroup = "Biceps";
                    break;
                case 5:
                    muscleGroup = "Triceps";
                    break;
                case 6:
                    muscleGroup = "Core";
                    break;
            }
            html += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>"
                + "<h1>Name: "+ row['name'] +"</h1>"
                + "<h3>MuscleGroup: "+ muscleGroup +"</h3>"
                + "<h3>Date: "+ row['date'] +"</h3>"
                + "</a></li>";


        }
        var lv = $("#lvAll");
        lv = lv.html(html);
        //very important
        lv.listview("refresh");

        $("#lvAll a").on("click", clickHandler);
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            //navigate to detail page
            // both will work
            $.mobile.changePage("#updateJournalEntryPage", {transition: 'slide'});
            // $(location).prop('href', '#pageDetail');
        }


    }
    journalEntries.selectAll(options, callback);
}

function showCurrent() {
    var id = localStorage.getItem("id");
    var options = [id];
    function callback(tx, result) {
        var row = result.rows[0];
        $("#txtupdateName").val(row['name']);
        $("#txtupdateHeight").val(row['height']);
        $("#txtupdateWeight").val(row['weight']);
        $("#txtupdateBMI").val(row['bmi']);
        var type = $("#updatelistExercise");
        type.val(row['typeId']);
        type.selectmenu("refresh");
    }

    journalEntries.select(options, callback);
}

function updating() {
    var options = [];
    if(doValidate_updateJournalEntryFrm()){
        var id = localStorage.getItem("id");
        var name = $("#txtupdateName").val();
        var height = $("#txtupdateHeight").val();
        var weight = $("#txtupdateWeight").val();
        var bmi = $("#txtupdateBMI").val();
        var date = $("#txtDate").val();
        var muscleGroup = $("#updatelistExercise").val();

        options = [name, height, weight, bmi,date, muscleGroup, id];

        function callback() {
            console.info("Success: Record updated successfully");
            alert("Updated Successfully");
            $.mobile.changePage("#journalPage", {transition: 'slide'});
        }

        journalEntries.update(options, callback);
    }
    else{
        console.log("Update Failed.");
    }

}

function deleteEntry() {
    var id = localStorage.getItem("id");

    var options = [id];
    function callback() {
        console.info("Success: Record deleted successfully");
        alert("Deleted Successfully");
        $.mobile.changePage("#journalPage", {transition: 'slide'});
    }

    journalEntries.delete(options, callback);
}


function dropdownMenu() {
    var options = [];
    function callback(tx, results) {
        var html = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            console.info("Doing some typing");

            html += "<option data-row-id="+row['id']+" value="+row['id']+">"+row['muscleGroup']+"</option>";


        }
        var lv = $("#listExercise");
        lv.append(html);
        //very important
        lv.selectmenu("refresh");
    }
    muscleGroup.selectAll(options, callback);
}

function dropdownMenuUpdate() {
    var options = [];
    function callback(tx, results) {
        var html = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            console.info("Doing some typing");
            html += "<option data-row-id="+row['id']+" value="+row['id']+">"+row['muscleGroup']+"</option>";
        }
        var lv = $("#updatelistExercise");
        lv.append(html);
        //very important
        lv.selectmenu("refresh");
    }
    muscleGroup.selectAll(options, callback);
}

function dropTables() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared.");
        } catch (e) {
            alert(e);
        }
    }
}

