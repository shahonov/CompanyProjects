import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { TextField, Button } from '@material-ui/core';
import { AddEmployeeModal } from './modals/AddEmployeeModal';

export interface Props {
    filter: (firstName: string, lastName: string, job: string) => void;
}

@observer
export class EmployeesFilters extends React.Component<Props> {

    @observable private firstName: string = '';
    @observable private lastName: string = '';
    @observable private job: string = '';
    @observable private openAddEmployee: boolean = false;

    public render(): React.ReactNode {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    size='small'
                    label="First Name"
                    variant="outlined"
                    value={this.firstName}
                    onChange={this.filterByFirstName} />
                <TextField
                    style={{ margin: '0 5px' }}
                    size='small'
                    label="Last Name"
                    variant="outlined"
                    value={this.lastName}
                    onChange={this.filterByLastName} />
                <TextField
                    style={{ margin: '0 5px' }}
                    size='small'
                    label="Job"
                    variant="outlined"
                    value={this.job}
                    onChange={this.filterByJob} />
                <Button
                    size='large'
                    variant="outlined"
                    onClick={this.filterCards}>Filter</Button>
                <Button
                    style={{ margin: '0 5px' }}
                    size='large'
                    variant="outlined"
                    onClick={this.cleanFilters}>Clean Filters</Button>
                <Button
                    size='large'
                    variant="outlined"
                    onClick={() => this.openAddEmployee = true}>Add New</Button>
                <AddEmployeeModal
                    isOpen={this.openAddEmployee}
                    onClose={() => this.openAddEmployee = false} />
            </form>
        );
    }

    @action.bound
    private filterByFirstName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.firstName = ev.currentTarget.value;
    }

    @action.bound
    private filterByLastName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.lastName = ev.currentTarget.value;
    }

    @action.bound
    private filterByJob(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.job = ev.currentTarget.value;
    }

    @action.bound
    private filterCards(): void {
        this.props.filter(this.firstName, this.lastName, this.job);
    }

    @action.bound
    private cleanFilters(): void {
        this.firstName = '';
        this.lastName = '';
        this.job = '';
        this.filterCards();
    }
}