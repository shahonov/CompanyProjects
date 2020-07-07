import { action, observable } from 'mobx';
import { Company } from "../models/Company";
import { Project } from "../models/Project";
import { Response } from '../models/Response';
import { Employee } from "../models/Employee";
import { CompanyAddress } from "../models/CompanyAddress";

const companies = require('./companies.json');
const companyAddresses = require('./company-addresses.json');
const employees = require('./employees.json');
const projects = require('./projects.json');

class Store {

    constructor() {
        this.companies = companies as Company[];
        this.companyAddresses = companyAddresses as CompanyAddress[];
        this.employees = employees as Employee[];
        this.projects = projects as Project[];
    }

    @observable public companies: Company[];

    @observable public companyAddresses: CompanyAddress[];

    @observable public employees: Employee[];

    @observable public projects: Project[];

    @action.bound
    public addCompany(company: Company): Response<boolean> {
        const idCompany = this.companies.find(x => x.id === company.id);
        if (idCompany && this.companies.includes(idCompany)) {
            return Response.fail(`company with id "${company.id} already exists`);
        }

        const nameCompany = this.companies.find(x => x.name === company.name);
        if (nameCompany && this.companies.includes(nameCompany)) {
            return Response.fail(`company with name "${company.name}" already exists`);
        }

        const sloganCompany = this.companies.find(x => x.slogan === company.slogan);
        if (sloganCompany && this.companies.includes(sloganCompany)) {
            return Response.fail(`company with slogan "${company.slogan}" already exists`);
        }

        this.companies.push(company);
        return Response.ok();
    }

    @action.bound
    public addCompanyAddress(companyAddress: CompanyAddress): Response<boolean> {
        const idCompanyAddress = this.companyAddresses.find(x => x.id === companyAddress.id);
        if (idCompanyAddress && this.companyAddresses.includes(idCompanyAddress)) {
            return Response.fail(`company address with id "${companyAddress.id}" already exists`);
        }

        return Response.ok();
    }

    @action.bound
    public addEmployee(employee: Employee): Response<boolean> {
        const idEmployee = this.employees.find(x => x.id === employee.id);
        if (idEmployee && this.employees.includes(idEmployee)) {
            return Response.fail(`employee with id "${employee.id} already exists`);
        }

        return Response.ok();
    }

    @action.bound
    public addProject(project: Project): Response<boolean> {
        const idProject = this.projects.find(x => x.id === project.id);
        if (idProject && this.projects.includes(idProject)) {
            return Response.fail(`project with id "${project.id}" already exists`);
        }

        return Response.ok();
    }
}

const store = new Store();
export default store;