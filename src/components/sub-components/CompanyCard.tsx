import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { Company } from '../../models/Company';

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

    @observable private showInfo: boolean = false;
    @observable private showEmployees: boolean = false;
    @observable private showProjects: boolean = false;

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
                            onClick={this.toggleInfo}>Info</Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={this.toggleEmployees}>Employees</Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={this.toggleProjects}>Projects</Button>
                    </CardActions>
                    {
                        this.showInfo
                        &&
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Info</Typography>
                            <Typography variant="h5" component="h2">About</Typography>
                            <Typography variant="body2" component="p">CompanyInfo</Typography>
                        </CardContent>
                    }
                    {
                        this.showEmployees
                        &&
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Employees</Typography>
                            <Typography variant="h5" component="h2">People</Typography>
                            <Typography variant="body2" component="p">Working in company</Typography>
                        </CardContent>
                    }
                    {
                        this.showProjects
                        &&
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Projects</Typography>
                            <Typography variant="h5" component="h2">Lele</Typography>
                            <Typography variant="body2" component="p">Big Project</Typography>
                        </CardContent>
                    }
                </StyledCard>
            </>
        );
    }

    @action.bound
    private toggleInfo(): void {
        this.showInfo = !this.showInfo;
        this.showEmployees = false;
        this.showProjects = false;
    }

    @action.bound
    private toggleEmployees(): void {
        this.showEmployees = !this.showEmployees;
        this.showInfo = false;
        this.showProjects = false;
    }

    @action.bound
    private toggleProjects(): void {
        this.showProjects = !this.showProjects;
        this.showInfo = false;
        this.showEmployees = false;
    }
}