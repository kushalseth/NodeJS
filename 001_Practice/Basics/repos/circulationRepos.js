const { MongoClient } = require("mongodb");
const url = "mongodb+srv://new-user:luqxU2vFCjjmI6eW@node.yjcwvwq.mongodb.net/?retryWrites=true&w=majority";
const dbName = "circulation";
const collectionName = "newspapers";

function circulationRepo() {
    function loadData(data) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                const results = await db.collection(collectionName).insertMany(data);
                resolve(results);
                client.close();
            }
            catch(error) {
                reject(error);
            }
        });

    }
    return { loadData, get };
}

function get() {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(url);
        try{
            await client.connect();
            const db = client.db(dbName);

            // .find() just resturns the cursor. nothing else, no data
            const items = db.collection(collectionName).find();
        }
        catch(error) {
            reject(error);
        }
    });
}

module.exports = circulationRepo();