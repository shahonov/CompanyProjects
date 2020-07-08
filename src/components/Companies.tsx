import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action, toJS } from 'mobx';
import store from '../data/Store';
import { Company } from '../models/Company';
import { FiltersLayout } from './FiltersLayout';
import { CompanyCard } from './sub-components/CompanyCard';

@observer
export class Companies extends React.PureComponent {

    @observable private name: string = '';
    @observable private business: string = '';

    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='company' filterCompanies={this.applyFilters}>
                {
                    this.companies.map((x, i) => {
                        return <CompanyCard key={i} company={x} />
                    })
                }
            </FiltersLayout>
        );
    }

    private get companies(): Company[] {
        let companies = toJS(store.companies);
        if (this.name !== '') {
            companies = companies.filter(x => x.name.toLowerCase().includes(this.name));
        }
        if (this.business !== '') {
            companies = companies.filter(x => x.business.toLowerCase().includes(this.business));
        }
        
        return companies;
    }

    @action.bound
    private applyFilters(name: string, business: string): void {
        this.name = name.toLowerCase();
        this.business = business.toLowerCase();
    }
}