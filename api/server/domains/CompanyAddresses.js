const func = require('./Shared');
const express = require('express');
const companyAddressRoutes = express.Router();
const dataFile = './server/data/company-addresses.json';

// HTTP:GET ENDPOINT
companyAddressRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
companyAddressRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

// HTTP:DELETE ENDPOINT
companyAddressRoutes.delete('', (request, response) => {
    const companyAddress = request.body;
    return func.deleteData(dataFile, response, x => x.id === companyAddress.id);
});

module.exports.companyAddressRoutes = companyAddressRoutes;