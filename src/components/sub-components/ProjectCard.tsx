import React from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { CardContent, Typography, CardActions, Button } from "@material-ui/core";
import store from "../../data/Store";
import { Project } from "../../models/Project";
import { Company } from "../../models/Company";
import { Employee } from "../../models/Employee";
import { EmployeesTable } from "../tables/EmployeesTable";
import { StyledCard } from "./styled-components/StyledCard";

export interface Props {
    project: Project;
}

@observer
export class ProjectCard extends React.Component<Props> {

    @observable private showCompany: boolean = false;
    @observable private showEmployees: boolean = false;

    private company: Company | undefined = store.companies.find(x => x.id === this.props.project.companyId);
    private employees: Employee[] | undefined = store.employees.filter(x => this.props.project.employeesId.includes(x.id));

    public render(): React.ReactNode {
        const {
            department,
            name
        } = this.props.project;
        return (
            <>
                <StyledCard variant="outlined">
                    <CardContent>
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