import * as React from 'react';
import { observable } from 'mobx';

export interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export class AddEmployeeModal extends React.Component<Props> {

    @observable private firstName: string = '';
    @observable private lastName: string = '';
    @observable private birthDate: string = '';
    @observable private companyId: string = '';
    @observable private jobArea: string = '';
    @observable private jobType: string = '';
    @observable private jobTitle: string = '';

    public render(): React.ReactNode {
        return (
            <div>Add Employee</div>
        )
    }
}