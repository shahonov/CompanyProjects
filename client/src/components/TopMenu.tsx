import * as React from 'react';
import styled from 'styled-components';
import { Breadcrumbs, Link } from '@material-ui/core';

const StyledLink = styled(Link)`
    padding: 5px 10px;
    border-radius: 5px;
    transition: .3s;
    &:hover {
        background-color: #777;
        color: white;
        cursor: pointer;
        transition: .3s;
    }
`;

export class TopMenu extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <Breadcrumbs>
                <StyledLink color="inherit" href="/home">Home</StyledLink>
                <StyledLink color="inherit" href="/companies">Companies</StyledLink>
                <StyledLink color="inherit" href="/projects">Projects</StyledLink>
                <StyledLink color="inherit" href="/employees">Employees</StyledLink>
            </Breadcrumbs>
        );
    }
}