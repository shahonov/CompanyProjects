const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const companyRoutes = require('./domains/Companies');
const employeeRoutes = require('./domains/Employees');
const projectRoutes = require('./domains/Projects');
const companyAddressRoutes = require('./domains/CompanyAddresses');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/companies', companyRoutes.companyRoutes);
app.use('/employees', employeeRoutes.employeeRoutes);
app.use('/company-addresses', companyAddressRoutes.companyAddressRoutes);
app.use('/projects', projectRoutes.projectRoutes);

app.listen(9000, () => {
	console.log('App is listening on port 9000');
});