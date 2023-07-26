export function writeToFile(dataToBeWritten) {
  window.requestFileSystem(
    LocalFileSystem.PERSISTENT,
    0,
    function (fs) {
      //console.log("file system open: " + fs.name);
      fs.root.getFile(
        "fruitForSale.json",
        { create: true, exclusive: false },
        function (fileEntry) {
          //console.log("fileEntry is file?" + fileEntry.isFile.toString());
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'
          writeFile(fileEntry, dataToBeWritten);
        },
        onErrorCreateFile
      );
    },
    onErrorLoadFs
  );
}
export function readFromFile(myFunction) {
  window.requestFileSystem(
    LocalFileSystem.PERSISTENT,
    0,
    function (fs) {
      console.log("file system open: " + fs.name);
      fs.root.getFile(
        "fruitForSale.json",
        { create: true, exclusive: false },
        function (fileEntry) {
          //console.log("fileEntry is file?" + fileEntry.isFile.toString());
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'
          readFile(fileEntry, myFunction);
        },
        onErrorCreateFile
      );
    },
    onErrorLoadFs
  );
}

function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      console.log("Successful file write...");
      let testingVar;
      readFile(fileEntry, testingVar);
    };

    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString());
    };

    // If data object is not passed in,
    // create a new Blob instead.
    // if (!dataObj) {
    //   //JSON.stringify(fruitsForSale.value)
    //   dataObj = new Blob(["[]"], {
    //     type: "text/plain",
    //   });
    // }

    fileWriter.write(dataObj);
  });
}

function readFile(fileEntry, myFunction) {
  fileEntry.file(function (file) {
    var reader = new FileReader();

    reader.onloadend = function () {
      console.log("Successful file read: ");
      if (this.result == "") {
        console.log("file not created yet");
      }
      myFunction(JSON.parse(this.result));

      //displayFileData(fileEntry.fullPath + ": " + this.result);
    };

    reader.readAsText(file);
  }, onErrorReadFile);
}

function onErrorLoadFs() {
  console.log("file path cannot be found");
}

function onErrorCreateFile() {
  console.log("file cannot be created");
}

function onErrorReadFile() {
  console.log("file cannot be read");
}
