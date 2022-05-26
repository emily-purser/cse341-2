const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Games API'
    },
    host: 'cse341-2.herokuapp.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpoint = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoint, doc);