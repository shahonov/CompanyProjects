import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { TextField, Button } from '@material-ui/core';
import { AddIcon } from './styled-components/AddIcon';
import { AddProjectModal } from '../modals/AddProjectModal';
import { ClearFiltersIcon } from './styled-components/ClearFiltersIcon';
import { FilterIcon } from './styled-components/FilterIcon';

export interface Props {
    filter: (name: string, department: string) => void;
}

@observer
export class ProjectsFilters extends React.Component<Props> {

    @observable private name: string = '';
    @observable private department: string = '';
    @observable private openAddProject: boolean = false;

    public render(): React.ReactNode {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    size='small'
                    label="Project Name"
                    variant="outlined"
                    value={this.name}
                    onChange={this.filterByName} />
                <TextField
                    style={{ margin: '0 5px' }}
                    size='small'
                    label="Department"
                    variant="outlined"
                    value={this.department}
                    onChange={this.filterByDepartment} />
                <Button
                    size='large'
                    variant="outlined"
                    onClick={this.filterCards}>
                    <FilterIcon />Filter
                </Button>
                <Button
                    style={{ margin: '0 5px' }}
                    size='large'
                    variant="outlined"
                    onClick={this.cleanFilters}>
                    <ClearFiltersIcon />Clear Filters
                </Button>
                <Button
                    size='large'
                    variant="outlined"
                    onClick={() => this.openAddProject = true}>
                    <AddIcon />Add New
                </Button>
                <AddProjectModal
                    isOpen={this.openAddProject}
                    onClose={() => this.openAddProject = false} />
            </form>
        );
    }

    @action.bound
    private filterByName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.name = ev.currentTarget.value;
    }

    @action.bound
    private filterByDepartment(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.department = ev.currentTarget.value;
    }

    @action.bound
    private filterCards(): void {
        this.props.filter(this.name, this.department);
    }

    @action.bound
    private cleanFilters(): void {
        this.name = '';
        this.department = '';
        this.filterCards();
    }
}