require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/antoree_DB");
        const state = mongoose.connection.readyState;
        const dbState = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
        console.log(`MongoDB status: ${dbState[state]}`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = connection;
