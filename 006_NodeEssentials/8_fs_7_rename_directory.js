const fs = require("fs");

const oldFolderName = "./8_fs_7_rename_directory_sam";
const newFolderName = "./8_fs_7_rename_directory_sample";

fs.rename(oldFolderName, newFolderName, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Renamed Successfully !!!");
});
