const fs = require("fs");

const folderName = "8_fs_4_create_directory";

if (!fs.existsSync(folderName)) {
  fs.mkdir(folderName, (error) => {
    if (error) {
      console.log(`Error: ${error}`);
    } else {
      console.log("directory created");
    }
  });
} else {
  console.log("Already Exists..");
}
