const fs = require('fs');

function getData(dataFile, response) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return internalServerError(response, err);
        } else {
            return success(response, data);
        }
    });
}

function putData(dataFile, request, response) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return internalServerError(response, err);
        } else {
            const dataArray = JSON.parse(data);
            const item = request.body;
            dataArray.push(item);

            fs.writeFile(dataFile, JSON.stringify(dataArray), (err) => {
                if (err) {
                    return internalServerError(response, err);
                } else {
                    return success(response);
                }
            });
        }
    });
}

function deleteData(dataFile, response, predicate) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return internalServerError(response, err);
        } else {
            const dataArray = JSON.parse(data);
            const foundData = dataArray.find(predicate);
            if (!foundData) {
                return internalServerError(response, 'not found to be deleted');
            }
            const index = dataArray.indexOf(foundData);
            dataArray.splice(index, 1);

            fs.unlink(dataFile, (err) => {
                if (err) {
                    return internalServerError(response, err);
                }
            });

            fs.writeFile(dataFile, JSON.stringify(dataArray), (err) => {
                if (err) {
                    return internalServerError(response, err);
                } else {
                    return success(response);
                }
            });
        }
    });
}

function internalServerError(response, error) {
    response.writeHead(500, { 'error': JSON.stringify(error) });
    return response.end();
}

function success(response, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (data) {
        response.write(data);
    } else {
        const message = JSON.stringify({ "message": "success" });
        response.write(message);
    }
    return response.end();
}

module.exports.getData = getData;
module.exports.putData = putData;
module.exports.deleteData = deleteData;