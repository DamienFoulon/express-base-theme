// Libs
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

// Config
dotenv.config();
const MONGO_URL = process.env.EXPRESS_APP_MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.EXPRESS_APP_MONGO_DBNAME || 'test';
let mongoClient = undefined;

export async function mongoConnect(req, res) {
    try {
        if (!mongoClient) {
            mongoClient = new MongoClient(MONGO_URL);
            await mongoClient.connect();
        }
    } catch (e) {
        console.error(e);
        throw new Error('Failed to connect to MongoDB');
    }
}

export async function mongoDisconnect() {
    try {
        if (mongoClient) {
            await mongoClient.close();
            console.log('Disconnected successfully from the server');
        }
    } catch (e) {
        console.error(e);
        throw new Error('Failed to disconnect from MongoDB');
    } finally {
        mongoClient = undefined;
    }
}

export async function mongoCreateOne(collectionName, document) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Insert a single document
        const insertResult = await collection.insertOne(document);
        console.log(`New listing created with the following id: ${insertResult.insertedId}`);
    } catch (e) {
        console.error(e);
        throw new Error('Failed to create a new document');
    }
}

export async function mongoCreateMany(collectionName, documents) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Insert multiple documents
        const insertResult = await collection.insertMany(documents);
        console.log(`${insertResult.insertedCount} new listings created with the following ids: ${insertResult.insertedIds}`);
    } catch (e) {
        console.error(e);
        throw new Error('Failed to create multiple documents');
    }
}
export async function mongoFindOne(collectionName, query) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Find a single document
        const findResult = await collection.findOne(query);
        return findResult;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to find a document');
    }
}

export async function mongoFindMany(collectionName, query) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Find multiple documents
        const findResult = await collection.find(query);
        return findResult.toArray();
    } catch (e) {
        console.error(e);
        throw new Error('Failed to find multiple documents');
    }
}

export async function mongoUpdateOne(collectionName, query, update) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Update a single document
        const updateResult = await collection.updateOne(query, update);
        console.log(`${updateResult.matchedCount} document(s) matched the query criteria.`);
        console.log(`${updateResult.modifiedCount} document(s) was/were updated.`);
        return updateResult;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to update a document');
    }
}

export async function mongoUpdateMany(collectionName, query, update) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Update multiple documents
        const updateResult = await collection.updateMany(query, update);
        console.log(`${updateResult.matchedCount} document(s) matched the query criteria.`);
        console.log(`${updateResult.modifiedCount} document(s) was/were updated.`);
        return updateResult;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to update multiple documents');
    }
}

export async function mongoDeleteOne(collectionName, query) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Delete a single document
        const deleteResult = await collection.deleteOne(query);
        console.log(`${deleteResult.deletedCount} document(s) was/were deleted.`);
        return deleteResult;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to delete a document');
    }
}

export async function mongoDeleteMany(collectionName, query) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(collectionName);

        // Delete multiple documents
        const deleteResult = await collection.deleteMany(query);
        console.log(`${deleteResult.deletedCount} document(s) was/were deleted.`);
        return deleteResult;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to delete multiple documents');
    }
}