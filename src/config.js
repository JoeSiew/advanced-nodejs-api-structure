const env = process.env;

const config = {
    port: parseInt(env.PORT, 10) || 3000,
    mongoDB: {
        uri: env.MONGODB_URL || "mongodb://localhost:27017",
        database: env.DATABASE || "sampleDB",
    },
}

module.exports = config;