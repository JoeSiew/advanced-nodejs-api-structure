const { createController } = require('awilix-express');

function sampleController({ repository }) {
    const sampleServices = repository.sampleServices;

    return {
        createSample: async (req, res) => {
            try {
                const sample  = req.body;
                const [status, result] = await sampleServices.createSample(sample);

                if (status === null) {
                    return res.status(400).json({
                        status: 'fail',
                        message: result
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                })
            } catch (e) {
                console.error(e);
            }
        }, 
        retrieveAllSamples: async (req, res) => {
            try {
                const [status, result] = await sampleServices.retrieveAllSamples();

                if (status === null) {
                    return res.status(404).json({
                        status: 'error',
                        message: result
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                })
            } catch (e) {
                console.error(e);
            }
        },
        updateSample: async (req, res) => {
            try {
                const { id } = req.params;
                const sample = req.body;
                
                const [status, result] = await sampleServices.updateSample( id, sample);

                if (status === null) {
                    return res.status(400).json({
                        status: 'fail',
                        message: result
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                });

            } catch (e) {
                console.error(e);
            }
        },
        deleteSample: async (req, res) => {
            try {
                const { id } = req.params;

                const [status, result] = await sampleServices.deleteSample(id);

                if (status === null) {
                    return res.status(400).json({
                        status: 'fail',
                        message: result
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                });

            } catch (e) {
                console.error(e);
            }
        }
    }
}

module.exports = createController(sampleController)
    .prefix("/api/sample")
    .post("/", "createSample")
    .get("/", "retrieveAllSamples")
    .patch("/:id", "updateSample")
    .delete("/:id", "deleteSample")