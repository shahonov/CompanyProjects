const func = require('./Shared');
const express = require('express');
const companyAddressRoutes = express.Router();
const dataFile = './api/server/data/company-addresses.json';

// HTTP:GET ENDPOINT
companyAddressRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
companyAddressRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

// HTTP:PATCH ENDPOINT
companyAddressRoutes.patch('', (request, response) => {
	const companyAddress = request.body;
    return func.patchData(dataFile, companyAddress, response, x => x.id === companyAddress.id);
});

// HTTP:DELETE ENDPOINT
companyAddressRoutes.delete('', (request, response) => {
    const companyAddress = request.body;
    return func.deleteData(dataFile, response, x => x.id === companyAddress.id);
});

module.exports.companyAddressRoutes = companyAddressRoutes;