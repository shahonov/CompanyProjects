const func = require('./Shared');
const express = require('express');
const employeeRoutes = express.Router();
const dataFile = './api/server/data/employees.json';

// HTTP:GET ENDPOINT
employeeRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
employeeRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

// HTTP:PATCH ENDPOINT
employeeRoutes.patch('', (request, response) => {
	const employee = request.body;
    return func.patchData(dataFile, response, x => x.id === employee.id);
});

// HTTP:DELETE ENDPOINT
employeeRoutes.delete('', (request, response) => {
    const employee = request.body;
    return func.deleteData(dataFile, response, x => x.id === employee.id);
});

module.exports.employeeRoutes = employeeRoutes;