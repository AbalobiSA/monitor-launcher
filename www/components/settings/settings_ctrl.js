angular.module('app.controllers').controller('settingsCtrl', function($scope, $cordovaAppVersion, $location, $state, $ionicPopup, $translate) {

    $scope.writeFile = function() {


            //Config Variables
            ABALOBI_FILE_DATA = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<!DOCTYPE properties SYSTEM \"http:\/\/java.sun.com\/dtd\/properties.dtd\">\r\n<properties>\r\n<entry key=\"common.change_google_account\">true<\/entry>\r\n<entry key=\"common.change_splash_settings\">true<\/entry>\r\n<entry key=\"common.change_username_password\">true<\/entry>\r\n<entry key=\"common.font_size\">16<\/entry>\r\n<entry key=\"common.sync_server_url\">https:\/\/abalobi-monitor.appspot.com<\/entry>\r\n<entry key=\"common.change_font_size\">true<\/entry>\r\n<entry key=\"common.change_sync_server\">true<\/entry>\r\n<entry key=\"common.change_auth_credentials\">true<\/entry>\r\n<entry key=\"common.splash_path\">ODK Default<\/entry>\r\n<entry key=\"common.show_splash\">true<\/entry>\r\n<\/properties>\r\n";
            ABALOBI_FILE_PATH = "opendatakit/default/config/assets";
            ABALOBI_FILE_NAME = "app.properties";

            console.log("STARTING FILE WRITING PROCESS...");

            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(directory) {
                console.log("DIR IS: " + directory.name);

                createDirectory(directory, ABALOBI_FILE_PATH, function(info) {
                        console.log("INFO" + info);
                        console.log("ATTEMPTING TO WRITE FILE...");

                        info.getFile(ABALOBI_FILE_NAME, {
                            create: true
                        }, function(file) {
                            console.log("got the file", file);
                            writeFile(file, ABALOBI_FILE_DATA, true);

                            var popupParams = {
                                title: 'Settings Saved', // String. The title of the popup.
                                cssClass: '', // String, The custom CSS class name
                                subTitle: '', // String (optional). The sub-title of the popup.
                                template: 'Your ODK settings have been saved! Please re-open ODK.', // String (optional). The html template to place in the popup body.
                                templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                                okText: '', // String (default: 'OK'). The text of the OK button.
                                okType: '', // String (default: 'button-positive'). The type of the OK button.
                            }
                            $ionicPopup.alert(popupParams);
                            $state.go("home");



                        });


                    })
                    // dir.filesystem.root.getDirectory(ABALOBI_FILE_PATH, { create: true }, gotDir);

            });


            function createDirectory(dir, path, success) {
                var dirs = path.split("/").reverse();
                var root = dir.filesystem.root;

                var createDir = function(dir) {
                    console.log("create dir " + dir);
                    root.getDirectory(dir, {
                        create: true,
                        exclusive: false
                    }, successCB, failCB);
                };

                var successCB = function(entry) {
                    console.log("dir created " + entry.fullPath);
                    root = entry;
                    if (dirs.length > 0) {
                        createDir(dirs.pop());
                    } else {
                        console.log("all dir created");
                        success(entry);
                    }
                };

                var failCB = function() {
                    console.log("failed to create dir " + dir);
                };

                createDir(dirs.pop());

            }

            function writeFile(fileEntry, dataObj, isAppend) {
                console.log("TRIGGERING WRITEFILE...");

                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter(function(fileWriter) {

                    fileWriter.onwriteend = function() {
                        console.log("Successful file read...");
                        // readFile(fileEntry);
                    };

                    fileWriter.onerror = function(e) {
                        console.log("Failed file read: " + e.toString());
                    };

                    // If we are appending data to file, go to the end of the file.
                    if (isAppend) {
                        try {
                            // fileWriter.seek(fileWriter.length);
                        } catch (e) {
                            console.log("file doesn't exist!");
                        }
                    }
                    var blob = new Blob([dataObj], { type: 'application/java-serialized-object' });
                    fileWriter.write(blob);


                    // fileWriter.write(dataObj);
                });

            }


            //FUNCTION TO READ FROM FILE
            // function readFile(fileEntry) {
            // 	console.log("TRIGGERING READFILE...");

            //     fileEntry.file(function(file) {
            //         var reader = new FileReader();

            //         reader.onloadend = function() {
            //             console.log("Successful file read: " + this.result);
            //             displayFileData(fileEntry.fullPath + ": " + this.result);
            //         };

            //         reader.readAsText(file);

            //     }, onErrorReadFile);
            // }
            //FUNCTION TO WRITE TO FILE



            //Alert in a popup
            // alert("THE FILE IS: \n\n" + ABALOBI_FILE_DATA);
            // function gotDirGeneric(dirEntry) {
            // 	console.log("TRIGGERING GOTDIR GENERIC...");

            // }            



            // function gotDir(dirEntry) {
            // 	console.log("TRIGGERING GOTDIR...");

            //     // dirEntry.getFile("temp.txt", {create: true, exclusive: true}, gotFile);
            //     dirEntry.getFile(ABALOBI_FILE_NAME, {
            //         create: true
            //     }, function(file) {
            //         console.log("got the file", file);
            //         writeFile(file, ABALOBI_FILE_DATA, true);

            //         var popupParams = {
            //             title: 'Settings Saved', // String. The title of the popup.
            //             cssClass: '', // String, The custom CSS class name
            //             subTitle: '', // String (optional). The sub-title of the popup.
            //             template: 'Your ODK settings have been saved! Please re-open ODK.', // String (optional). The html template to place in the popup body.
            //             templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
            //             okText: '', // String (default: 'OK'). The text of the OK button.
            //             okType: '', // String (default: 'button-positive'). The type of the OK button.
            //         }
            //         $ionicPopup.alert(popupParams);
            //         $state.go("home");



            //     });
            // }

            // function gotFile(fileEntry) {
            //     // Do something with fileEntry here
            // }

            // Now, save to FILE












        } //End of save button click




    /*=====================================================================
      Utility Methods
    =====================================================================*/



    function splitIntoJSON(stringToSplit) {
        var finalObject = {};

        //Separate all values into an array
        var commaSplit = stringToSplit.split(",");

        for (var i = 0; i < commaSplit.length; i++) {

            //For each pair of values, split by equals
            var equalsSplit = commaSplit[i].split("=");

            //If this is running the first time, remove the 'Digest' text
            if (i == 0) {
                equalsSplit[0] = equalsSplit[0].replace(/Digest/g, '');
            }

            //Remove spaces from variable names
            var spacesRemoved = removeSpaces(equalsSplit[0].toString());
            finalObject[spacesRemoved.toString()] = removeEscapes(equalsSplit[1]);
        }

        return finalObject;
    }

    function removeSpaces(processMe) {
        return processMe.replace(/\s+/g, '');
    }

    function removeEscapes(processMe) {
        return processMe.replace(/\"/g, '');
    }

    function createRequest(reqOptions, success, callbackFunction, callbackError) {
        console.log("Executing second request...");
        $http(reqOptions).then(function successCallback(response) {
            if (response.status == 200) {
                callbackFunction();
            } else {
                console.log("ERROR STATUS = " + response.status);
                callbackError();
            }
            // console.log("SUCCESS");
            // // this callback will be called asynchronously
            // // when the response is available
            // console.log(printJSON(response));
            // console.log(printJSON(response.headers()));
        }, function errorCallback(response) {
            callbackError();
        });
    }

    var randomString = function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    var nicerDigest = function(sentDigestString) {
        var digestArray = sentDigestString.split(",");
        var escapedString = "";
        for (var i = 0; i < digestArray.length; i++) {
            escapedString += digestArray[i] + "\n";
        }
        return escapedString;
    }

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    function appendTransform(defaults, transform) {

        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults];

        // Append the new transformation to the defaults
        return defaults.concat(transform);
    }

    var printJSON = function(receivedJSON) {
            return JSON.stringify(receivedJSON, null, 4);
        }
        //FILE SYSTEM METHODS
    function gotFS(fileSystem) {
        fileSystem.root.getDirectory("opendatakit/default/config/assets", { create: true }, gotDir, fail);
        console.log(fileSystem.root);
    }

    function fail(error) {
        console.log(error.code);
    }



})
