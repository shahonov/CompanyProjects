import * as React from 'react';
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

export class CompanyCard extends React.Component<Props> {
    public render(): React.ReactNode {
        const {
            name,
            business,
            slogan
        } = this.props.company;
        return (
            <StyledCard variant="outlined">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>{business}</Typography>
                    <Typography variant="h5" component="h2">{name}</Typography>
                    <Typography variant="body2" component="p">{slogan}</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small">Info</Button>
                    <Button variant="outlined" size="small">Employees</Button>
                    <Button variant="outlined" size="small">Projects</Button>
                </CardActions>
            </StyledCard>
        );
    }
}