const func = require('./Shared');
const express = require('express');
const companyRoutes = express.Router();
const dataFile = './api/server/data/companies.json';

// HTTP:GET ENDPOINT
companyRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
companyRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

// HTTP:PATCH ENDPOINT
companyRoutes.patch('', (request, response) => {
	const company = request.body;
	return func.patchData(dataFile, response, x => x.id === company.id);
});

// HTTP:DELETE ENDPOINT
companyRoutes.delete('', (request, response) => {
    const company = request.body;
    return func.deleteData(dataFile, response, x => x.id === company.id);
});

module.exports.companyRoutes = companyRoutes;