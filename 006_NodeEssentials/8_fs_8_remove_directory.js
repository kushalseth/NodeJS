const fs = require("fs");

const folderName = "./8_fs_8_remove_directory_sample";

fs.rmdir(folderName, (error) => {
    if (error) {
        console.log(error);
      }
      console.log("Removed Successfully !!!");    
})

