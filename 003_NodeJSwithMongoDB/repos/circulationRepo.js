const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config.json");
const data = require("../circulation.json");

function circulationRepo() {
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      // console.log(JSON.stringify(config));
      const client = new MongoClient(config.mongoDb.dbUrl);

      try {
        await client.connect();
        const db = client.db(config.mongoDb.dbName);

        const results = await db
          .collection(config.mongoDb.collectionName)
          .insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        console.error("error occurred in loadData", error);
        reject(error);
      }
    });
  }

  function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const mongoClient = new MongoClient(config.mongoDb.dbUrl);
      try {
        const db = mongoClient.db(config.mongoDb.dbName);
        console.log("get");
        // find() doesn't actuaaly hit database, it just returns the cursor. The data is returned when we do .ToArray()
        const items = db.collection(config.mongoDb.collectionName).find(query);

        if (items > 0) {
          items = items.limit(limit);
        }

        const data = await items?.toArray();
        console.log("get done");
        resolve(data);
        mongoClient.close();
      } catch (error) {
        console.error("error occurred in get", error);
        reject(error);
      }
    });
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const mongoClient = new MongoClient(config.mongoDb.dbUrl);
      try {
        const db = mongoClient.db(config.mongoDb.dbName);
        console.log("get by Id", id);
        // find() doesn't actuaaly hit database, it just returns the cursor. The data is returned when we do .ToArray()
        const item = await db
          .collection(config.mongoDb.collectionName)
          .findOne({ _id: new ObjectId(id) });

        console.log("get by Id done", item);
        resolve(item);
        mongoClient.close();
      } catch (error) {
        console.error("error occurred in getById", error);
        reject(error);
      }
    });
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("inside add");
        const client = new MongoClient(config.mongoDb.dbUrl);
        await client.connect();
        let db = client.db(config.mongoDb.dbName);

        const data = await db
          .collection(config.mongoDb.collectionName)
          .insertOne(item);
          
        console.log(data);
        resolve(data);
        client.close();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  function update(id, item) {
    return new Promise(async (resolve, reject) => {
      try {
        let client = new MongoClient(config.mongoDb.dbUrl);
        await client.connect();

        const db = client.db(config.mongoDb.dbName);
        const result = await db
          .collection(config.mongoDb.collectionName)
          .findOneAndReplace({ _id: new ObjectId(id) }, item);
        
          console.log(result);
          resolve(result);
        client.close();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  function remove(id) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("inside remove");
        const client = new MongoClient(config.mongoDb.dbUrl);
        await client.connect();
        const db = client.db(config.mongoDb.dbName);

        const result = await db
          .collection(config.mongoDb.collectionName)
          .deleteOne({ _id: new ObjectId(id) });

        console.log("after deleteOne");
        resolve(result);
        client.close();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  function averageFinalist() {
    return new Promise(async (resolve, reject) => {
      try {
        let client = new MongoClient(config.mongoDb.dbUrl);
        await client.connect();
        
        console.log("inside averageFinalist method");
        let db = client.db(config.mongoDb.dbName);
        const result = await db.collection(config.mongoDb.collectionName).aggregate([{
          $group: {
            _id: null,
            avgFinalist: {$avg : "$Pulitzer Prize Winners and Finalists, 1990-2003"}
          }
        }]);
        console.log(result);
        resolve(result);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
  }

  return { loadData, get, getById, add, update, remove, averageFinalist };
}

module.exports = circulationRepo();
