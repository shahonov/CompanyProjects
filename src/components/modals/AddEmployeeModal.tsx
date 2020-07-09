import * as React from 'react';
import { observable, action } from 'mobx';
import { Modal, Button } from '@material-ui/core';
import store from '../../data/Store';
import { Employee } from '../../models/Employee';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';

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
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Add New Employee</h2>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="First Name"
                            variant="outlined"
                            value={this.firstName}
                            onChange={this.handleChangeFirstName} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Last Name"
                            variant="outlined"
                            value={this.lastName}
                            onChange={this.handleChangeLastName} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Birth Date"
                            variant="outlined"
                            value={this.birthDate}
                            onChange={this.handleChangeBirthDate} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Job Area"
                            variant="outlined"
                            value={this.jobArea}
                            onChange={this.handleChangeJobType} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Job Type"
                            variant="outlined"
                            value={this.jobType}
                            onChange={this.handleChangeJobArea} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Job Title"
                            variant="outlined"
                            value={this.jobTitle}
                            onChange={this.handleChangeJobTitle} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Company"
                            variant="outlined"
                            value={this.companyId}
                            onChange={this.handleChangeCompanyId} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <Button
                            size='large'
                            variant="outlined"
                            onClick={this.addNewEmployee}>Add</Button>
                    </ModalInputWrapper>
                </StyledModal>
            </Modal>
        )
    }

    @action.bound
    private handleChangeFirstName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.firstName = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeLastName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.lastName = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeBirthDate(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.birthDate = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeJobType(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.jobType = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeJobArea(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.jobArea = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeJobTitle(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.jobTitle = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCompanyId(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.companyId = ev.currentTarget.value;
    }

    @action.bound
    private addNewEmployee(): void {
        const id = store.nextId().toString();
        const employee = {
            companyId: this.companyId,
            firstName: this.firstName, 
            lastName: this.lastName,
            dateOfBirth: this.birthDate,
            jobArea: this.jobArea,
            jobType: this.jobType,
            jobTitle: this.jobTitle,
            id: id
        } as Employee;

        const response = store.addEmployee(employee);
        if (!response.isSuccess) {
            alert(response.message);
        } else {
            this.props.onClose();
        }
    }
}