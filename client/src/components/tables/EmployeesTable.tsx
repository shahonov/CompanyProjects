import * as React from 'react';
import { Typography } from '@material-ui/core';
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
            this.props.employees.length > 0 
            ?
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
            :
            <Typography
                    gutterBottom
                    color="textSecondary"
                    style={{ margin: '10px 0 10px 10px' }} >
                    No employees found.
                </Typography>
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