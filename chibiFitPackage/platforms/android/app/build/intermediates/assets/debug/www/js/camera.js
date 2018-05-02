/**
 * File Name: camera.js
 *
 * Revision History:
 *       Pj & Tuan, 2018-04-22 : Created
 */

function capturePhoto() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
        correctOrientation: true
    };

    function onFail(error) {
        alert('Failed because: ' + error.message);
    }

    function onSuccess(imageURI) {
        var image = $("#imgSnap");
        image.prop("src", imageURI);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}
