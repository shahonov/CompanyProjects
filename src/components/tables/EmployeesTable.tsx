import * as React from 'react';
import { Employee } from '../../models/Employee';
import { TableData } from './styled-components/TableData';
import { TableHeader } from './styled-components/TableHeader';

interface RowData {
    fullName: string;
    job: string;
}

export interface Props {
    employees: Employee[];
}

export class EmployeesTable extends React.Component<Props> {

    public render(): React.ReactNode {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <TableHeader>Full Name</TableHeader>
                        <TableHeader>Job</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <TableData>{x.fullName}</TableData>
                                    <TableData>{x.job}</TableData>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

    private get rows(): RowData[] {
        const data = this.props.employees.map(x => {
            return {
                fullName: `${x.firstName} ${x.lastName}`,
                job: `${x.jobArea}, ${x.jobType}`
            } as RowData;
        });
        return data;
    }
}