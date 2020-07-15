const func = require('./Shared');
const express = require('express');
const projectRoutes = express.Router();
const dataFile = './server/data/projects.json';

// HTTP:GET ENDPOINT
projectRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
projectRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

// HTTP:DELETE ENDPOINT
projectRoutes.delete('', (request, response) => {
    const project = request.body;
    return func.deleteData(dataFile, response, x => x.id === project.id);
});

module.exports.projectRoutes = projectRoutes;