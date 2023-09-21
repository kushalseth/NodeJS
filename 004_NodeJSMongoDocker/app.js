const { MongoClient } = require("mongodb");
const circulationRepo = require("./repos/circulationRepo.js");
const data = require("./circulation.json");
const config = require("./config.json");
const assert = require("assert");

async function main() {
  console.log(
    "set the enableTests one by one to test each end point. All are false by default. \n"
  );
  let client = new MongoClient(config.mongoDb.dbUrl);
  await client.connect();

  try {
    // drop database
    if (config.enableTests.dropDatabase) {
      console.log("started dropping db");
      await client.db(config.mongoDb.dbName).dropDatabase();
      console.log("db dropped");
    }

    // inserting data in database
    if (config.enableTests.loadData) {
      console.log("started ");
      const results = await circulationRepo.loadData(data);
      console.log(
        "insert assert",
        assert.equal(data.length, results.insertedCount)
      );
    }

    // get all data from DB
    if (config.enableTests.get) {
      const getAllNewspapers = await circulationRepo.get();
      assert.deepEqual(data.length, getAllNewspapers.length);
      console.log("assert: get all ", getAllNewspapers);
    }

    // filter data from DB
    if (config.enableTests.filter) {
      console.log("filtering started");
      const getNewspaper = await circulationRepo.get(
        { Newspaper: "Wall Street Journal" },
        5
      );
      console.log(JSON.stringify(getNewspaper));
    }

    // get data from DB
    if (config.enableTests.getById) {
      console.log("is to find", "64759a2678a0bfb8de05c02e");
      const byId = await circulationRepo.getById("64759a2678a0bfb8de05c02e");
      console.log("get Newspaper By Id Done: ", byId);
    }

    // add item to DB
    if (config.enableTests.add) {
      console.log("trying to add new record");
      const newItem = {
        Newspaper: "Hindustan Times",
        "Daily Circulation, 2004": 1,
        "Daily Circulation, 2013": 2,
        "Change in Daily Circulation, 2004-2013": 100,
        "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
        "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
        "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
      };
      const addedItem = await circulationRepo.add(newItem);
      if (addedItem.acknowledged) {
        console.log(addedItem.acknowledged ? "added successfully"  : "addition failed");
      }
    }

    // update
    if (config.enableTests.update) {
      const getItemById = await circulationRepo.getById(
        "64759b2dfd1f337ceb517323"
      );
      getItemById.Newspaper = "Hindustan Times, Delhi";
      const updatedItem = await circulationRepo.update(
        getItemById._id,
        getItemById
      );
    }

    // delete
    if (config.enableTests.remove) {
      const _id = "64759b2dfd1f337ceb517323";
      const result = await circulationRepo.remove(_id);
      console.log("deleted result");
      const getItemById = await circulationRepo.getById(_id);
      console.log("getItemById result");
      if (!getItemById) {
        console.log("deleted successfully");
      }
    }

    // averaging
    if (config.enableTests.avgFinalist) {
      const result = await circulationRepo.averageFinalist();
      console.log("avgFinalist ", result);
    }

    // validating
    if (config.enableTests.adminCommands) {
      let admin = await client.db(config.mongoDb.dbName).admin();
      console.log(await admin.listDatabases());
    }
  } catch (error) {
    console.error("error in app.js", error);
  } finally {
    client.close();
  }
}

main();
