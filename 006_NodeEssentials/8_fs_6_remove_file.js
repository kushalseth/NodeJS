const fs = require("fs");
const fileName = "./8_fs_6_remove_file_sample.md";

fs.unlink(fileName, (error) => {
  if (error) {
    throw error;
  }
  console.log("!!! File Removed Successfully !!!");
});
