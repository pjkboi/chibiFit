/**
 * File Name: util.js
 *
 * Revision History:
 *       Pj & Tuan, 2018-04-22 : Created
 */
function doValidate_newJournalEntryFrm() {
    var form = $("#newJournalEntryFrm");
    form.validate({
        rules:{
            txtName: {
                required:true
            },
            txtHeight:{
                required: true,
                min: 1
            },
            txtWeight:{
                required: true,
                min: 1
            }
        },
        messages:{
            txtName: {
                required:"Name Required"
            },
            txtHeight:{
                required: "Height Required",
                min: "Height Cannot be less than zero"
            },
            txtWeight:{
                required: "Height Required",
                min: "Height Cannot be less than zero"
            }
        }
    });
    return form.valid();
}

function doValidate_updateJournalEntryFrm() {
    var form = $("#updateJournalEntryFrm");
    form.validate({
        rules:{
            txtupdateName: {
                required:true
            },
            txtupdateHeight:{
                required: true,
                min: 1
            },
            txtupdateWeight:{
                required: true,
                min: 1
            }
        },
        messages:{
            txtupdateName: {
                required:"Name Required"
            },
            txtupdateHeight:{
                required: "Height Required",
                min: "Height Cannot be less than zero"
            },
            txtupdateWeight:{
                required: "Height Required",
                min: "Height Cannot be less than zero"
            }
        }
    });
    return form.valid();
}
