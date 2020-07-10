import React from "react";
import { observer } from "mobx-react";
import { observable, action, computed } from "mobx";
import { CardContent, Typography, CardActions, Button } from "@material-ui/core";
import store from "../../data/Store";
import { Project } from "../../models/Project";
import { Company } from "../../models/Company";
import { Employee } from "../../models/Employee";
import project from '../../assets/icons/project.svg';
import { ProjectImg } from "./styled-components/Img";
import { EditIcon } from "./styled-components/EditIcon";
import { EmployeesTable } from "../tables/EmployeesTable";
import { StyledCard } from "./styled-components/StyledCard";
import { DeleteIcon } from "./styled-components/DeleteIcon";
import { EditProjectModal } from "../modals/EditProjectModal";
import { TopButtonWrapper } from "./styled-components/TopButtonsWrapper";

export interface Props {
    project: Project;
}

@observer
export class ProjectCard extends React.Component<Props> {

    @observable private showCompany: boolean = false;
    @observable private showEmployees: boolean = false;
    @observable private showEditModal: boolean = false;
    @observable private image: HTMLImageElement | null = null;

    public render(): React.ReactNode {
        const {
            department,
            name
        } = this.props.project;
        return (
            <StyledCard
                onMouseEnter={() => {
                    this.image?.classList.add('highlight');
                }}
                onMouseLeave={() => {
                    this.image?.classList.remove('highlight');
                }}
                variant="outlined">
                <ProjectImg ref={x => this.image = x} src={project} alt='project' />
                <CardContent>
                    <TopButtonWrapper>
                        <EditIcon onClick={() => this.showEditModal = true} />
                        <DeleteIcon onClick={this.deleteProject} />
                    </TopButtonWrapper>
                    <Typography color="textSecondary" gutterBottom>{department}</Typography>
                    <Typography variant="h5" component="h2">{name}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={this.toggleCompany}>Company</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={this.toggleEmployees}>Employees</Button>
                </CardActions>
                {this.showCompany && this.getCompany()}
                {this.showEmployees && this.getEmployees()}
                <EditProjectModal
                    isOpen={this.showEditModal}
                    project={this.props.project}
                    onClose={() => this.showEditModal = false} />
            </StyledCard>
        );
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

    @computed
    private get company(): Company | undefined {
        return store.companies.find(x => x.id === this.props.project.companyId);
    }

    @computed
    private get employees(): Employee[] | undefined {
        return store.employees.filter(x => this.props.project.employeesId.includes(x.id));
    }

    @action.bound
    private deleteProject(): void {
        store.deleteProject(this.props.project.id);
    }

    @action.bound
    private toggleCompany(): void {
        this.showCompany = !this.showCompany;
        this.showEmployees = false;
    }

    private getEmployees(): React.ReactNode {
        return this.employees && <EmployeesTable employees={this.employees} />
    }

    @action.bound
    private toggleEmployees(): void {
        this.showEmployees = !this.showEmployees;
        this.showCompany = false;
    }
}