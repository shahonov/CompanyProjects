import * as React from 'react';
import store from '../data/Store';
import { FiltersLayout } from './FiltersLayout';
import { CompanyCard } from './sub-components/CompanyCard';

export class Companies extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='company'>
                {
                    store.companies.map((x, i) => {
                        return <CompanyCard key={i} company={x} />
                    })
                }
            </FiltersLayout>
        );
    }
}