import * as React from 'react';
import { Project } from '../../models/Project';
import { TableData } from './styled-components/TableData';
import { TableHeader } from './styled-components/TableHeader';

interface RowData {
    name: string;
    department: string;
    employees: number;
}

export interface Props {
    projects: Project[];
}

export class ProjectsTable extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <TableHeader>Project Name</TableHeader>
                        <TableHeader>Department</TableHeader>
                        <TableHeader>Working Staff</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <TableData>{x.name}</TableData>
                                    <TableData>{x.department}</TableData>
                                    <TableData>{x.employees}</TableData>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

    private get rows(): RowData[] {
        const data = this.props.projects.map(x => {
            return {
                name: x.name,
                department: x.department,
                employees: x.employeesId.length
            } as RowData;
        });
        return data;
    }
}