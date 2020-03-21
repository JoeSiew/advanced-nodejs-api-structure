const { asClass, asValue, asFunction, createContainer } = require("awilix");
const { MongoClient } = require("mongodb");

module.exports = async (configurations) => {
    const container = createContainer();

    const client = await MongoClient.connect(configurations.mongoDB.uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const database = client.db(configurations.mongoDB.database);

    // Define your collections here
    const collections = {
        database,
        sampleCollection: database.collection('sampleCollection'),
        templateCollection: database.collection('templateCollection')
    };

    // Define your services here
    const sampleServices = require('./services/sampleServices')({config: configurations, collections});
    const templateServices = require('./services/templateServices')({config: configurations, collections});

    container.register({
        repository: asValue({
            sampleServices,
            templateServices
        }),
    });

    return container;
}