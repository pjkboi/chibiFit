var cameraReady = false;

function init() {

    $(document).on("deviceready", document_deviceready);
    
    $("#journalPage").on("pageshow", profilePage);
    $("#createJournalEntryPage").on("pageshow", showDropMenu);
    $("#newJournalEntry").on("click", addNewEntry);
    $("#updateJournalEntryPage").on("pageshow", selectEntry);
    $("#btnupdateJournalEntry").on("click", updateEntry);
    $("#btnDelete").on("click", deleting);
    $("#txtHeight").on("change", calculate);
    $("#txtWeight").on("change", calculate);
    $("#txtupdateHeight").on("change", calculateupdate);
    $("#txtupdateWeight").on("change", calculateupdate);

    $("#btnCancel").on("click", btnCancel_click);
    $("#btnCreateEntry").on("click", btnCreateEntry_click);
    $("#btnViewEntry").on("click", btnViewEntry_click);

    $("#btnCapturePhoto").on("click", btnCapturePhoto_click);
    $("#imgSnap").on("error", imagePlaceHolder);

    $("#btnClear").on("click", clear_all);
    $(".btnHome").on("click", btnHome_click);
    $("#btnCreateJournalEntry").on("click", btnAddEntry);

}

function btnHome_click() {
    location.reload();
    $.mobile.changePage("#loginPage", {transition: 'slide'});
}
function btnAddEntry() {
    location.reload();
    $.mobile.changePage("#createJournalEntryPage", {transition: 'slide'});
}
function clear_all() {
    dropTables();
    location.reload();
}

function imagePlaceHolder() {
    this.src='img/loginIcon.png';
}
function document_deviceready() {
    cameraReady = true;
}

function btnCapturePhoto_click() {
    if (cameraReady) {
        capturePhoto();
    }
    else{
        alert("Camera is not Ready");
    }
}
function btnCreateEntry_click() {
    $.mobile.changePage("#createJournalEntryPage", {transition: 'slide'});
}
function btnViewEntry_click() {
    $.mobile.changePage("#journalPage", {transition: 'slide'});
}

function btnCancel_click() {
    $.mobile.changePage("#journalPage", {transition: 'slide'});
}
function calculateupdate() {
    calculateupdateBMI();
}
function showDropMenu() {
    dropdownMenu();
    showDate();
}
function calculate() {
    calculateBMI();
}
function profilePage() {
    showAll();
}
function addNewEntry() {
    addEntry();
}
function selectEntry() {
    dropdownMenuUpdate();
    showCurrent();
    showDateUpdate();
    calculateupdateBMI();
}
function updateEntry() {
    updating();
}
function deleting() {
    deleteEntry();
}

function initDB() {
    console.info("Creating database ...");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating tables ... ");
            DB.createTables();
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});