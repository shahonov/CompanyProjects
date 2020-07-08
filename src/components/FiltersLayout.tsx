import * as React from 'react';
import { ProjectsFilters } from './ProjectsFilters';
import { CompaniesFilters } from './CompaniesFilters';
import { EmployeesFilters } from './EmployeesFilters';
import { ContentWrapper } from '../styled-components/Containers';

export type FilterType = 'company' | 'project' | 'employee';

export interface Props {
    filter: FilterType;
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
        switch(this.props.filter) {
            case 'company': return <CompaniesFilters />;
            case 'project': return <ProjectsFilters />;
            case 'employee': return <EmployeesFilters />;
            default: return false;
        }
    }
}