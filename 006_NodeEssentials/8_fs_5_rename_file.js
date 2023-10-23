const fs = require("fs");

const oldFileName = "./8_fs_5_rename_file_sam.md";
const newFileName = "./8_fs_5_rename_file_sample.md";

fs.rename(oldFileName, newFileName, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Renamed Successfully !!!");
});
