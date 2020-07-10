import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { CardContent, Typography, CardActions, Button } from '@material-ui/core';
import store from '../../data/Store';
import { Company } from '../../models/Company';
import { Project } from '../../models/Project';
import { Employee } from '../../models/Employee';
import { ProjectsTable } from '../tables/ProjectsTable';
import { EditIcon } from './styled-components/EditIcon';
import { EmployeesTable } from '../tables/EmployeesTable';
import { StyledCard } from './styled-components/StyledCard';
import { DeleteIcon } from './styled-components/DeleteIcon';
import { CompanyAddress } from '../../models/CompanyAddress';
import { EditCompanyModal } from '../modals/EditCompanyModal';
import { TopButtonWrapper } from './styled-components/TopButtonsWrapper';

export interface Props {
    company: Company;
}

@observer
export class CompanyCard extends React.Component<Props> {

    @observable private showAddress: boolean = false;
    @observable private showEmployees: boolean = false;
    @observable private showProjects: boolean = false;
    @observable private showEditModal: boolean = false;

    public render(): React.ReactNode {
        const { name, business, slogan } = this.props.company;
        return (
            <>
                <StyledCard variant="outlined">
                    <CardContent>
                        <TopButtonWrapper>
                            <EditIcon onClick={() => this.showEditModal = true} />
                            <DeleteIcon onClick={this.deleteCompany} />
                        </TopButtonWrapper>
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
                    <EditCompanyModal
                        isOpen={this.showEditModal}
                        company={this.props.company}
                        onClose={() => this.showEditModal = false} />
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

    @computed
    private get address(): CompanyAddress | undefined {
        return store.companyAddresses.find(x => x.companyId === this.props.company.id);
    }

    @computed
    private get employees(): Employee[] | undefined {
        return store.employees.filter(x => x.companyId === this.props.company.id);
    }

    @computed
    private get projects(): Project[] | undefined {
        return store.projects.filter(x => x.companyId === this.props.company.id);
    }

    @action.bound
    private deleteCompany(): void {
        store.deleteCompany(this.props.company.id);
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