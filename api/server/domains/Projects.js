const func = require('./Shared');
const express = require('express');
const projectRoutes = express.Router();
const dataFile = './api/server/data/projects.json';

// HTTP:GET ENDPOINT
projectRoutes.get('', (request, response) => {
    return func.getData(dataFile, response);
});

// HTTP:PUT ENDPOINT
projectRoutes.put('', (request, response) => {
    return func.putData(dataFile, request, response);
});

//HTTP:PATCH ENDPOINT
projectRoutes.patch('', (request, response) => {
	const project = request.body;
    return func.patchData(dataFile, project, response, x => x.id === project.id);
});

// HTTP:DELETE ENDPOINT
projectRoutes.delete('', (request, response) => {
    const project = request.body;
    return func.deleteData(dataFile, response, x => x.id === project.id);
});

module.exports.projectRoutes = projectRoutes;