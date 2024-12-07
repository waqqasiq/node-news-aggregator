const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');
const outputFile = './swagger_output.json'; // Output file
const endpointsFiles = ['./app.js']; // Your main application or routes file

const doc = {
    info: {
        title: 'News Aggregator Documentation',
        description: 'Documentation for the API',
    },
    host: 'localhost:3010',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
