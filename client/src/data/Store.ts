import { action, observable } from 'mobx';
import { Company } from "../models/Company";
import { Project } from "../models/Project";
import { Response } from '../models/Response';
import { Employee } from "../models/Employee";
import { ProjectsStream } from './ProjectsStream';
import { CompaniesStream } from './CompaniesStream';
import { EmployeesStream } from './EmployeesStream';
import { CompanyAddress } from "../models/CompanyAddress";
import { CompanyAddressesStream } from './CompanyAddressesStream';

class Store {

    private readonly companiesStream: CompaniesStream;
    private readonly companyAddressesStream: CompanyAddressesStream;
    private readonly employeesStream: EmployeesStream;
    private readonly projectsStream: ProjectsStream;

    @observable private id: number;

    constructor() {
        this.id = 0;
        const refetchinterval = 10 * 1000; // 10 seconds
        this.companiesStream = new CompaniesStream(refetchinterval);
        this.companyAddressesStream = new CompanyAddressesStream(refetchinterval);
        this.employeesStream = new EmployeesStream(refetchinterval);
        this.projectsStream = new ProjectsStream(refetchinterval);
    }

    public get companies(): Company[] {
        return this.companiesStream.data;
    }

    public get companyAddresses(): CompanyAddress[] {
        return this.companyAddressesStream.data;
    }

    public get employees(): Employee[] {
        return this.employeesStream.data;
    }

    public get projects(): Project[] {
        return this.projectsStream.data;
    }

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

        this.companiesStream.put(company);
        return Response.ok();
    }

    @action.bound
    public deleteCompany(companyId: string): void {
        const company = this.companies.find(x => x.id === companyId);
        if (company) {
            this.companiesStream.delete(company);
        }

        const companyAddress = this.companyAddresses.find(x => x.companyId === companyId);
        if (companyAddress) {
            this.companyAddressesStream.delete(companyAddress);
        }
    }

    @action.bound
    public updateCompany(
        companyId: string,
        name: string,
        business: string,
        slogan: string): void {
        const company = this.companies.find(x => x.id = companyId);
        if (company) {
            company.name = name;
            company.business = business;
            company.slogan = slogan;
            this.companiesStream.delete(company);
            setTimeout(() => {
                this.companiesStream.put(company);
            }, 200);
        }
    }

    @action.bound
    public addCompanyAddress(companyAddress: CompanyAddress): Response<boolean> {
        const idCompanyAddress = this.companyAddresses.find(x => x.id === companyAddress.id);
        if (idCompanyAddress && this.companyAddresses.includes(idCompanyAddress)) {
            return Response.fail(`company address with id "${companyAddress.id}" already exists`);
        }

        this.companyAddressesStream.put(companyAddress);
        return Response.ok();
    }

    @action.bound
    public updateCompanyAddress(
        companyAddressId: string,
        country: string,
        state: string,
        city: string,
        street: string): void {
        const companyAddress = this.companyAddresses.find(x => x.id === companyAddressId);
        if (companyAddress) {
            companyAddress.country = country;
            companyAddress.state = state;
            companyAddress.city = city;
            companyAddress.street = street;
            this.companyAddressesStream.delete(companyAddress);
            setTimeout(() => {
                this.companyAddressesStream.put(companyAddress);
            }, 200);
        }
    }

    @action.bound
    public addEmployee(employee: Employee): Response<boolean> {
        const idEmployee = this.employees.find(x => x.id === employee.id);
        if (idEmployee && this.employees.includes(idEmployee)) {
            return Response.fail(`employee with id "${employee.id} already exists`);
        }

        this.employeesStream.put(employee);
        return Response.ok();
    }

    @action.bound
    public deleteEmployee(employeeId: string): void {
        const employee = this.employees.find(x => x.id === employeeId);
        if (employee) {
            this.employeesStream.delete(employee);
        }
    }

    @action.bound
    public updateEmployee(
        employeeId: string,
        companyId: string,
        firstName: string,
        lastName: string,
        birthDate: string,
        jobArea: string,
        jobType: string,
        jobTitle: string): void {
        const employee = this.employees.find(x => x.id === employeeId);
        if (employee) {
            employee.companyId = companyId;
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.dateOfBirth = birthDate;
            employee.jobArea = jobArea;
            employee.jobType = jobType;
            employee.jobTitle = jobTitle;
            this.employeesStream.delete(employee);
            setTimeout(() => {
                this.employeesStream.put(employee);
            }, 200);
        }
    }

    @action.bound
    public addProject(project: Project): Response<boolean> {
        const idProject = this.projects.find(x => x.id === project.id);
        if (idProject && this.projects.includes(idProject)) {
            return Response.fail(`project with id "${project.id}" already exists`);
        }

        this.projectsStream.put(project);
        return Response.ok();
    }

    @action.bound
    public deleteProject(projectId: string): void {
        const project = this.projects.find(x => x.id === projectId);
        if (project) {
            this.projectsStream.delete(project);
        }
    }

    @action.bound
    public updateProject(projectId: string, name: string, department: string, companyId: string, employeesId: string[]): void {
        const project = this.projects.find(x => x.id === projectId);
        if (project) {
            project.name = name;
            project.department = department;
            project.companyId = companyId;
            project.employeesId = employeesId;
            this.projectsStream.delete(project);
            setTimeout(() => {
                this.projectsStream.put(project);
            }, 200);
        }
    }

    @action.bound
    public nextId(): number {
        this.id = this.id + 1;
        return this.id;
    }
}

const store = new Store();
export default store;