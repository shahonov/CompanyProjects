import * as React from 'react';
import store from '../data/Store';
import { FiltersLayout } from './filters/FiltersLayout';
import { EmployeeCard } from './sub-components/EmployeeCard';
import { observer } from 'mobx-react';
import { observable, action, toJS } from 'mobx';
import { Employee } from '../models/Employee';

@observer
export class Employees extends React.PureComponent {

    @observable private firstName: string = '';
    @observable private lastName: string = '';
    @observable private job: string = '';

    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='employee' filterEmployees={this.applyFilters}>
                {
                    this.employees.map((x, i) => {
                        return <EmployeeCard key={i} employee={x} />
                    })
                }
            </FiltersLayout>
        );
    }

    private get employees(): Employee[] {
        let employees = toJS(store.employees);
        if (this.firstName !== '') {
            employees = employees.filter(x => x.firstName.toLowerCase().includes(this.firstName));
        }
        if (this.lastName !== '') {
            employees = employees.filter(x => x.lastName.toLowerCase().includes(this.lastName));
        }
        if (this.job !== '') {
            employees = employees.filter(x => {
                const jobTitle = x.jobTitle.toLowerCase().includes(this.job);
                const jobType = x.jobType.toLowerCase().includes(this.job);
                const jobArea = x.jobArea.toLowerCase().includes(this.job);
                return jobTitle || jobType || jobArea;
            });
        }

        return employees;;
    }

    @action.bound
    private applyFilters(firstName: string, lastName: string, job: string): void {
        this.firstName = firstName.toLowerCase();
        this.lastName = lastName.toLowerCase();
        this.job = job.toLowerCase();
    }
}