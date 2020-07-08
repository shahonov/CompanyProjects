import * as React from 'react';
import { ProjectsFilters } from './ProjectsFilters';
import { CompaniesFilters } from './CompaniesFilters';
import { EmployeesFilters } from './EmployeesFilters';
import { ContentWrapper } from '../styled-components/Containers';

export type FilterType = 'company' | 'project' | 'employee';

export interface Props {
    filter: FilterType;
    filterCompanies?: (name: string, business: string) => void;
    filterProjects?: (name: string, department: string) => void;
    filterEmployees?: (firstName: string, lastName: string, job: string) => void;
}

export class FiltersLayout extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <ContentWrapper>
                {this.renderFilter()}
                {this.props.children}
            </ContentWrapper>
        );
    }

    private renderFilter(): React.ReactNode {
        const {
            filter,
            filterCompanies,
            filterProjects,
            filterEmployees
        } = this.props;
        switch (filter) {
            case 'company': return (
                <CompaniesFilters
                    filter={
                        filterCompanies as (name: string, business: string) => void
                    } />
            );
            case 'project': return (
                <ProjectsFilters
                    filter={
                        filterProjects as (name: string, department: string) => void
                    } />
            );
            case 'employee': return (
                <EmployeesFilters
                    filter={
                        filterEmployees as (firstName: string, lastName: string, job: string) => void
                    } />
            );
            default: return false;
        }
    }
}