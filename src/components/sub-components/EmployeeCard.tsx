import React from "react";
import { observer } from "mobx-react";
import { observable, action, computed } from "mobx";
import { CardContent, Typography, CardActions, Button } from "@material-ui/core";
import store from "../../data/Store";
import { Project } from "../../models/Project";
import { Company } from "../../models/Company";
import { Employee } from "../../models/Employee";
import { EmployeeImg } from "./styled-components/Img";
import employee from '../../assets/icons/employee.svg';
import { ProjectsTable } from "../tables/ProjectsTable";
import { EditIcon } from "./styled-components/EditIcon";
import { StyledCard } from "./styled-components/StyledCard";
import { DeleteIcon } from "./styled-components/DeleteIcon";
import { EditEmployeeModal } from "../modals/EditEmployeeModal";
import { TopButtonWrapper } from "./styled-components/TopButtonsWrapper";


export interface Props {
    employee: Employee;
}

@observer
export class EmployeeCard extends React.Component<Props> {

    @observable private showCompany: boolean = false;
    @observable private showProjects: boolean = false;
    @observable private showEditModal: boolean = false;
    @observable private image: HTMLImageElement | null = null;

    public render(): React.ReactNode {
        const {
            firstName,
            lastName,
            jobArea,
            jobTitle,
            jobType
        } = this.props.employee;
        return (
            <StyledCard
                onMouseEnter={() => {
                    this.image?.classList.add('highlight');
                }}
                onMouseLeave={() => {
                    this.image?.classList.remove('highlight');
                }}
                variant="outlined">
                <EmployeeImg ref={x => this.image = x} src={employee} alt='employee' />
                <CardContent>
                    <TopButtonWrapper>
                        <EditIcon onClick={() => this.showEditModal = true} />
                        <DeleteIcon onClick={this.deleteEmployee} />
                    </TopButtonWrapper>
                    <Typography color="textSecondary" gutterBottom>{this.formatDate}</Typography>
                    <Typography variant="h5" component="h2">{`${firstName} ${lastName}`}</Typography>
                    <Typography variant="body2" component="p">{`${jobArea}, ${jobType}`}</Typography>
                    <Typography variant="body2" component="h4">{jobTitle}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={this.toggleCompany}>Company</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={this.toggleProjects}>Projects</Button>
                </CardActions>
                {this.showCompany && this.getCompany()}
                {this.showProjects && this.getProjects()}
                <EditEmployeeModal
                    isOpen={this.showEditModal}
                    employee={this.props.employee}
                    onClose={() => this.showEditModal = false} />
            </StyledCard>
        );
    }

    @computed
    private get company(): Company | undefined {
        return store.companies.find(x => x.id === this.props.employee.companyId);
    }

    @computed
    private get projects(): Project[] | undefined {
        return store.projects.filter(x => x.employeesId.includes(this.props.employee.id));
    }

    @action.bound
    private deleteEmployee(): void {
        store.deleteEmployee(this.props.employee.id);
    }

    private get formatDate(): string {
        const birthDate = this.props.employee.dateOfBirth;
        if (birthDate === '') {
            return '';
        }

        const date = new Date(birthDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const formatted = `${date.getDate()} ${month} ${date.getFullYear()}`;
        return formatted;
    }

    private getCompany(): React.ReactNode {
        return (
            this.company
            &&
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{this.company.business}</Typography>
                <Typography variant="h5" component="h2">{this.company.name}</Typography>
                <Typography variant="body2" component="p">{this.company.slogan}</Typography>
            </CardContent>
        );
    }

    @action.bound
    private toggleCompany(): void {
        this.showCompany = !this.showCompany;
        this.showProjects = false;
    }

    private getProjects(): React.ReactNode {
        return this.projects && <ProjectsTable projects={this.projects} />
    }

    @action.bound
    private toggleProjects(): void {
        this.showProjects = !this.showProjects;
        this.showCompany = false;
    }
}