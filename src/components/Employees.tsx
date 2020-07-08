import * as React from 'react';
import store from '../data/Store';
import { FiltersLayout } from './FiltersLayout';
import { EmployeeCard } from './sub-components/EmployeeCard';

export class Employees extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='employee'>
                {
                    store.employees.map(x => {
                        return <EmployeeCard employee={x} />
                    })
                }
            </FiltersLayout>
        );
    }
}