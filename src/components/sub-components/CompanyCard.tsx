import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { observable, action } from 'mobx';
import store from '../../data/Store';
import { Company } from '../../models/Company';
import { Project } from '../../models/Project';
import { Employee } from '../../models/Employee';
import { ProjectsTable } from '../tables/ProjectsTable';
import { EmployeesTable } from '../tables/EmployeesTable';
import { CompanyAddress } from '../../models/CompanyAddress';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const StyledCard = styled(Card)`
    width: 400px;
    display: inline-block;
    margin: 5px;
    transition: .3s;
    &:hover {
        box-shadow: 2px 2px 10px black;
        transition: .3s;
    }
`;

export interface Props {
    company: Company;
}

@observer
export class CompanyCard extends React.Component<Props> {

    @observable private showAddress: boolean = false;
    @observable private showEmployees: boolean = false;
    @observable private showProjects: boolean = false;

    private address: CompanyAddress | undefined = store.companyAddresses.find(x => x.companyId === this.props.company.id);
    private employees: Employee[] | undefined = store.employees.filter(x => x.companyId === this.props.company.id);
    private projects: Project[] | undefined = store.projects.filter(x => x.companyId === this.props.company.id);

    public render(): React.ReactNode {
        const { name, business, slogan } = this.props.company;
        return (
            <>
                <StyledCard variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{business}</Typography>
                        <Typography variant="h5" component="h2">{name}</Typography>
                        <Typography variant="body2" component="p">{slogan}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={this.toggleAddress}>Address</Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={this.toggleEmployees}>Employees</Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={this.toggleProjects}>Projects</Button>
                    </CardActions>
                    {this.showAddress && this.getAddress()}
                    {this.showEmployees && this.getEmployees()}
                    {this.showProjects && this.getProjects()}
                </StyledCard>
            </>
        );
    }

    @action.bound
    private toggleAddress(): void {
        this.showAddress = !this.showAddress;
        this.showEmployees = false;
        this.showProjects = false;
    }

    private getAddress(): React.ReactNode {
        return (
            this.address
            &&
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {this.address.city}, {this.address.country}
                </Typography>
                <Typography variant="h5" component="h2">
                    {this.address.state}
                </Typography>
                <Typography variant="body2" component="p">
                    {this.address.street}
                </Typography>
            </CardContent>
        );
    }

    @action.bound
    private toggleEmployees(): void {
        this.showEmployees = !this.showEmployees;
        this.showAddress = false;
        this.showProjects = false;
    }

    private getEmployees(): React.ReactNode {
        return this.employees && <EmployeesTable employees={this.employees} />;
    }

    @action.bound
    private toggleProjects(): void {
        this.showProjects = !this.showProjects;
        this.showAddress = false;
        this.showEmployees = false;
    }

    private getProjects(): React.ReactNode {
        return this.projects && <ProjectsTable projects={this.projects} />
    }
}