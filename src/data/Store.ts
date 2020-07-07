import { Company } from "../models/Company";
import { CompanyAddress } from "../models/CompanyAddress";
import { Employee } from "../models/Employee";
import { Project } from "../models/Project";

const companies = require('./companies.json');
const companyAddresses = require('./company-addresses.json');
const employees = require('./employees.json');
const projects = require('./projects.json');

export class Store {

    constructor() {
        this.companies = companies as Company[];
        this.companyAddresses = companyAddresses as CompanyAddress[];
        this.employees = employees as Employee[];
        this.projects = projects as Project[];
    }

    public companies: Company[];

    public companyAddresses: CompanyAddress[];

    public employees: Employee[];

    public projects: Project[];
}