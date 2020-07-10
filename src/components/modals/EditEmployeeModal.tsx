import * as React from 'react';
import { Employee } from '../../models/Employee';

export interface Props {
    isOpen: boolean;
    employee: Employee;
    onClose: () => void;
}

export class EditEmployeeModal extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <div>edit emp</div>
        );
    }
}