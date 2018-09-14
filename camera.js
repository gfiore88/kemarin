var NodeWebcam = require("node-webcam");


//Default options

var opts = {

    //Picture related

    width: 352,

    height: 288,

    quality: 100,


    //Delay to take shot

    delay: 0,


    //Save shots in memory

    saveShots: true,


    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "jpeg",


    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,


    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "location",


    //Logging

    verbose: true

};


//Creates webcam instance

var Webcam = NodeWebcam.create(opts);


//Will automatically append location output type
/*
Webcam.capture("test_picture", function (err, data) {
});


//Also available for quick use

NodeWebcam.capture("test_picture", opts, function (err, data) {

});
*/

//Get list of cameras



//Return type with base 64 image

var opts = {
    callbackReturn: "base64"
};

module.exports = {

    list: function() {
        Webcam.list(function (list) {

            //Use another device

            var cam_list = NodeWebcam.create({device: list[0]});
            console.log(cam_list);
            return list;
        });
    },

    capture: function () {

        NodeWebcam.capture("test_picture", opts, function (err, data) {
            if (!err) {
                console.log("leggo camera");
                var image = "<img src='" + data + "'>";
                return image;
            }
            console.log("ERRORE");
            return err;
        });
    }

};