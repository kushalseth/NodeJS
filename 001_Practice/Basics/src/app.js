const { MongoClient, ServerApiVersion } = require('mongodb');
const assert = require("assert");

const circulationRepo = require("../repos/circulationRepos.js");
const data = require("../Data/circulation.json");
const uri = "mongodb+srv://<<user>>:<<password>>@node.yjcwvwq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const dbName = "circulation";

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // console.log('Connected successfully to server');
    await client.connect();

    // check how many records are inserted
    const results = await circulationRepo.loadData(data);
    assert.equal(data.length, results.insertedCount);

    const getData = await circulationRepo.get();

    // Pinged your deployment. You successfully connected to MongoDB!
    const admin = await client.db(dbName).admin();
    admin.command({ ping: 1 });    
    console.log(await admin.listDatabases());

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);