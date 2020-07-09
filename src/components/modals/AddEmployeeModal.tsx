import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { observable, action } from 'mobx';
import { Modal, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import store from '../../data/Store';
import { Employee } from '../../models/Employee';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';

const SelectForm = styled(FormControl)`
    width: 100%;
`;

const ModalDateInputWrapper = styled.span`
    margin: 0 2px;
`;

const SelectDateForm = styled(SelectForm)`
    width: 32%;
`;

export interface Props {
    isOpen: boolean;
    onClose: () => void;
}

@observer
export class AddEmployeeModal extends React.Component<Props> {

    @observable private firstName: string = '';
    @observable private lastName: string = '';
    @observable private birthYear: string = '';
    @observable private birthMonth: string = '';
    @observable private birthDate: string = '';
    @observable private companyId: string = '';
    @observable private jobArea: string = '';
    @observable private jobType: string = '';
    @observable private jobTitle: string = '';

    public render(): React.ReactNode {
        console.log(this.companyId);
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
                    <ModalDateInputWrapper>
                        <SelectDateForm variant="outlined" size='small'>
                            <InputLabel>Birth Year</InputLabel>
                            <Select
                                label="BirthYear"
                                value={this.birthYear}
                                onChange={this.handleChangeBirthYear}>
                                {
                                    (() => {
                                        const date = new Date(Date.now());
                                        const startYear = date.getFullYear() - 55;
                                        const endYear = date.getFullYear() - 5;
                                        const allYears: number[] = [];
                                        for (let i = endYear; i >= startYear; i--) {
                                            allYears.push(i);
                                        }
                                        return allYears.map(x => {
                                            return <MenuItem key={x} value={x}>{x}</MenuItem>;
                                        });
                                    })()
                                }
                            </Select>
                        </SelectDateForm>
                    </ModalDateInputWrapper>
                    <ModalDateInputWrapper>
                        <SelectDateForm variant="outlined" size='small'>
                            <InputLabel>Birth Month</InputLabel>
                            <Select
                                label="BirthMonth"
                                value={this.birthMonth}
                                onChange={this.handleChangeBirthMonth}>
                                {
                                    (() => {
                                        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                                        const year = new Date(Date.now()).getFullYear();
                                        const monthNames: string[] = {
                                            ...(months.map(x => {
                                                const date = new Date(year, x, 1);
                                                return date.toLocaleString('default', { month: 'long' });
                                            }))
                                        }
                                        return months.map(x => {
                                            return <MenuItem key={x} value={x}>{monthNames[x]}</MenuItem>;
                                        });
                                    })()
                                }
                            </Select>
                        </SelectDateForm>
                    </ModalDateInputWrapper>
                    <ModalDateInputWrapper>
                        <SelectDateForm variant="outlined" size='small'>
                            <InputLabel>Birth Date</InputLabel>
                            <Select
                                label="BirthDate"
                                value={this.birthDate}
                                onChange={this.handleChangeBirthDate}
                                disabled={this.birthYear === '' || this.birthMonth === ''}>
                                {
                                    (() => {
                                        const date = new Date(+this.birthYear, +this.birthMonth, 1);
                                        const dates: number[] = [];
                                        while (date.getMonth() === +this.birthMonth) {
                                            dates.push(date.getDate());
                                            date.setDate(date.getDate() + 1);
                                        }
                                        return dates.map(x => {
                                            return <MenuItem key={x} value={x}>{x}</MenuItem>;
                                        });
                                    })()
                                }
                            </Select>
                        </SelectDateForm>
                    </ModalDateInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Job Area"
                            variant="outlined"
                            value={this.jobArea}
                            onChange={this.handleChangeJobArea} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Job Type"
                            variant="outlined"
                            value={this.jobType}
                            onChange={this.handleChangeJobType} />
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
    private handleChangeBirthYear(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.birthYear = (ev.target.value as any).toString();
        }
    }

    @action.bound
    private handleChangeBirthMonth(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.birthMonth = (ev.target.value as any).toString();
        }
    }

    @action.bound
    private handleChangeBirthDate(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.birthDate = (ev.target.value as any).toString();
        }
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
    private handleChangeCompanyId(ev: React.ChangeEvent<{ name?: string | undefined, value: unknown }>): void {
        if (ev.target.value) {
            this.companyId = (ev.target.value as any).toString();
        }
    }

    @action.bound
    private addNewEmployee(): void {
        if (!this.validateInputs()) {
            return;
        }

        const id = store.nextId().toString();
        const date = new Date(+this.birthYear, +this.birthMonth, +this.birthDate);
        const employee = {
            companyId: this.companyId,
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: date.toString(),
            jobArea: this.jobArea,
            jobType: this.jobType,
            jobTitle: this.jobTitle,
            id: id
        } as Employee;
        
        const response = store.addEmployee(employee);
        if (!response.isSuccess) {
            alert(response.message);
        } else {
            this.companyId = '';
            this.firstName = '';
            this.lastName = '';
            this.birthYear = '';
            this.birthMonth = '';
            this.birthDate = '';
            this.jobTitle = '';
            this.jobArea = '';
            this.jobType = '';
            this.props.onClose();
        }
    }

    private validateInputs(): boolean {
        if (this.firstName === '') {
            alert('You must enter first name.');
            return false;
        } else if (this.lastName === '') {
            alert('You must enter last name.');
            return false;
        } else if (this.birthYear === '') {
            alert('You must choose birth year.');
            return false;
        } else if (this.birthMonth === '') {
            alert('You must choose birth month.');
            return false;
        } else if (this.birthDate === '') {
            alert('You must choose birth date.');
            return false;
        } else if (this.jobArea === '') {
            alert('You must enter job area.');
            return false;
        } else if (this.jobType === '') {
            alert('You must enter job type.');
            return false;
        } else if (this.jobTitle === '') {
            alert('You must enter job title');
            return false;
        } else if (this.companyId === '') {
            alert('You must choose company.');
            return false;
        }

        return true;
    }
}