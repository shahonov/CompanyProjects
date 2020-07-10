import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { observable, action, toJS } from 'mobx';
import { Modal, Button, InputLabel, Select, MenuItem, FormControl, Input, Chip } from '@material-ui/core';
import store from '../../data/Store';
import { Project } from '../../models/Project';
import { SelectForm } from './styled-components/SelectForm';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';

const MultiSelectForm = styled(Select)`
    min-width: 120px;
    max-width: 450px;
`;

const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface Props {
    isOpen: boolean;
    project: Project;
    onClose: () => void;
}

@observer
export class EditProjectModal extends React.Component<Props> {

    @observable private name: string = toJS(this.props.project.name);
    @observable private department: string = toJS(this.props.project.department);
    @observable private companyId: string = toJS(this.props.project.companyId);
    @observable private employeeIds: string[] = toJS(this.props.project.employeesId);

    public render(): React.ReactNode {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Edit Project</h2>
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
                        <SelectForm variant="outlined" size='small'>
                            <InputLabel>Company</InputLabel>
                            <Select
                                label="Company"
                                value={this.companyId}
                                onChange={this.handleChangeCompanyId}>
                                {
                                    store.companies.map((x, i) => {
                                        return <MenuItem key={i} value={x.id}>{x.name}</MenuItem>;
                                    })
                                }
                            </Select>
                        </SelectForm>
                    </ModalInputWrapper>
                    <FormControl>
                        <InputLabel>Employees</InputLabel>
                        <MultiSelectForm
                            multiple
                            input={<Input />}
                            value={this.employeeIds}
                            onChange={this.handleChangeEmployees}
                            renderValue={(selected) => {
                                return (
                                    <Chips>
                                        {
                                            (selected as string[]).map((value) => {
                                                const employee = store.employees.find(x => x.id === value);
                                                const label = `${employee?.firstName} ${employee?.lastName}`;
                                                return <Chip style={{ margin: '2px' }} variant='outlined' key={value} label={label} />
                                            })
                                        }
                                    </Chips>
                                )
                            }} MenuProps={MenuProps}>
                            {
                                store.employees.map((x, i) => {
                                    return <MenuItem key={i} value={x.id}>{`${x.firstName} ${x.lastName}`}</MenuItem>;
                                })
                            };
                        </MultiSelectForm>
                    </FormControl>
                    <ModalInputWrapper>
                        <Button
                            size='large'
                            variant="outlined"
                            onClick={this.updateProject}>Update</Button>
                    </ModalInputWrapper>
                </StyledModal>
            </Modal >
        );
    }

    @action.bound
    private handleChangeEmployees(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.employeeIds = ev.target.value as any as string[];
        }
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
    private handleChangeCompanyId(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.companyId = (ev.target.value as any).toString();
        }
    }

    @action.bound
    private updateProject(): void {
        if (!this.isValidInputs()) {
            return;
        }

        store.updateProject(
            this.props.project.id, 
            this.name, 
            this.department, 
            this.companyId,
            this.employeeIds
        );
        
        this.props.onClose();
    }

    private isValidInputs(): boolean {
        if (this.name === '') {
            alert('You must enter name.');
            return false;
        } else if (this.department === '') {
            alert('You must enter department.');
            return false;
        } else if (this.companyId === '') {
            alert('You must choose company.');
            return false;
        } else if (this.employeeIds.length === 0) {
            alert('You must choose at least one employee.');
            return false;
        }

        return true;
    }
}