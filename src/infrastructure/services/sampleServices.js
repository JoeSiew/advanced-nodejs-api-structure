const uuidv1 = require('uuid/v1');

module.exports = function ( {config, collections }) {

    const currentCollection = collections.sampleCollection;

    return {
        createSample: async function (sample) {
            try {
                sample.sampleId = uuidv1();

                const { insertedCount } = await currentCollection.insertOne(sample);
                
                if (!insertedCount) {
                    return [null, "Fail to insert sample"];
                }

                return [, sample]
            } catch (e) {
                console.error(e);
            }
        },
        retrieveAllSamples: async function () {
            try {   
                const samples = await currentCollection.find({}).toArray();
                
                if(!samples) {
                    return [null, "Something went wrong, fail to retrieve all samples"];
                }

                return [, samples];
            } catch (e) {
                console.error(e);
            }
        },
        updateSample: async function (sampleId, sample) {
            try {
                if (!sampleId || !sample) {
                    return [null, "Please provide sample id and sample"];
                }

                const { matchedCount } = await currentCollection.updateOne ( 
                    {sampleId},
                    { $set: sample });

                if (!matchedCount) { 
                    return [null, "Fail to update, sample does not exist"]; 
                }

                return [ , { sampleId, sample } ]       
            } catch (e) {
                console.error(e);
            }
        },
        deleteSample: async function (sampleId) {
            try {
                if (!sampleId) {
                    return [null, "Please provide sample id"];
                }

                const { deletedCount } = await currentCollection.deleteOne( { sampleId } );
    
                if (!deletedCount) {
                    return [ null, "Fail to delete, document does not exist"]
                }

                return [ , null]
            } catch (e) {
                console.error(e);
            }
        }
    }
}

