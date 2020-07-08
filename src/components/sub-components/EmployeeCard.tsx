import React from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { CardContent, Typography, CardActions, Button } from "@material-ui/core";
import store from "../../data/Store";
import { Project } from "../../models/Project";
import { Company } from "../../models/Company";
import { Employee } from "../../models/Employee";
import { ProjectsTable } from "../tables/ProjectsTable";
import { StyledCard } from "./styled-components/StyledCard";

export interface Props {
    employee: Employee;
}

@observer
export class EmployeeCard extends React.Component<Props> {

    @observable private showCompany: boolean = false;
    @observable private showProjects: boolean = false;

    private company: Company | undefined = store.companies.find(x => x.id === this.props.employee.companyId);
    private projects: Project[] | undefined = store.projects.filter(x => x.employeesId.includes(this.props.employee.id));

    public render(): React.ReactNode {
        const {
            firstName,
            lastName,
            dateOfBirth,
            jobArea,
            jobTitle,
            jobType
        } = this.props.employee;
        return (
            <>
                <StyledCard variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{dateOfBirth}</Typography>
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
                </StyledCard>
            </>
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