import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Modal, Button } from '@material-ui/core';
import store from '../../data/Store';
import { Project } from '../../models/Project';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';

export interface Props {
    isOpen: boolean;
    onClose: () => void;
}

@observer
export class AddProjectModal extends React.Component<Props> {

    @observable private name: string = '';
    @observable private department: string = '';
    @observable private companyId: string = '';
    @observable private employeeIds: string[] = [];

    public render(): React.ReactNode {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Add New Project</h2>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Name"
                            variant="outlined"
                            value={this.name}
                            onChange={this.handleChangeName} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Department"
                            variant="outlined"
                            value={this.department}
                            onChange={this.handleChangeDepartment} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Company"
                            variant="outlined"
                            value={this.companyId}
                            onChange={this.handleChangeCompany} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Employees"
                            variant="outlined"
                            value={''}
                            onChange={this.handleChangeEmployees} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <Button
                            size='large'
                            variant="outlined"
                            onClick={this.addNewProject}>Add</Button>
                    </ModalInputWrapper>
                </StyledModal>
            </Modal>
        )
    }

    @action.bound
    private handleChangeName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.name = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeDepartment(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.department = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCompany(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.companyId = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeEmployees(ev: React.ChangeEvent<HTMLInputElement>): void {

    }

    @action.bound
    private addNewProject(): void {
        const id = store.nextId().toString();
        const project = {
            companyId: this.companyId,
            id: id,
            name: this.name,
            department: this.department,
            employeesId: []
        } as Project;

        const response = store.addProject(project);
        if (!response.isSuccess) {
            alert(response.message);
        } else {
            this.props.onClose();
        }
    }
}