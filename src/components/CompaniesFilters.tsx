import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { TextField, Button } from '@material-ui/core';
import { AddCompanyModal } from './modals/AddCompanyModal';

export interface Props {
    filter: (name: string, business: string) => void;
}

@observer
export class CompaniesFilters extends React.Component<Props> {

    @observable private name: string = '';
    @observable private business: string = '';
    @observable private openAddCompany: boolean = false;

    public render(): React.ReactNode {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    size='small'
                    label="Company Name"
                    variant="outlined"
                    value={this.name}
                    onChange={this.filterByName} />
                <TextField
                    style={{ margin: '0 5px' }}
                    size='small'
                    label="Business"
                    variant="outlined"
                    value={this.business}
                    onChange={this.filterByBusiness} />
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
                    onClick={() => this.openAddCompany = true}>Add New</Button>
                <AddCompanyModal
                    isOpen={this.openAddCompany}
                    onClose={() => this.openAddCompany = false} />
            </form>
        );
    }

    @action.bound
    private filterByName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.name = ev.currentTarget.value;
    }

    @action.bound
    private filterByBusiness(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.business = ev.currentTarget.value;
    }

    @action.bound
    private filterCards(): void {
        this.props.filter(this.name, this.business);
    }

    @action.bound
    private cleanFilters(): void {
        this.name = '';
        this.business = '';
        this.filterCards();
    }
}