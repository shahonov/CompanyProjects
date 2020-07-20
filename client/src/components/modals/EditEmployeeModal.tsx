import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, toJS, action } from 'mobx';
import { Modal, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import store from '../../data/Store';
import { Employee } from '../../models/Employee';
import { SelectForm } from './styled-components/SelectForm';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { SelectDateForm } from './styled-components/SelectDateForm';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';
import { ModalDateInputWrapper } from './styled-components/ModalDateInputWrapper';

export interface Props {
    isOpen: boolean;
    employee: Employee;
    onClose: () => void;
}

@observer
export class EditEmployeeModal extends React.Component<Props> {

    @observable private firstName: string = toJS(this.props.employee.firstName);
    @observable private lastName: string = toJS(this.props.employee.lastName);
    @observable private birthYear: string = toJS(
        (() => {
            const date = new Date(this.props.employee.dateOfBirth);
            return date.getFullYear().toString();
        })()
    );
    @observable private birthMonth: string = toJS(
        (() => {
            const date = new Date(this.props.employee.dateOfBirth);
            return date.getMonth().toString();
        })()
    );
    @observable private birthDate: string = toJS(
        (() => {
            const date = new Date(this.props.employee.dateOfBirth);
            return date.getDate().toString();
        })()
    );
    @observable private companyId: string = toJS(this.props.employee.companyId);
    @observable private jobArea: string = toJS(this.props.employee.jobArea);
    @observable private jobType: string = toJS(this.props.employee.jobType);
    @observable private jobTitle: string = toJS(this.props.employee.jobTitle);

    public render(): React.ReactNode {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Edit Employee</h2>
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
                                        const startYear = date.getFullYear() - 95;
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
                            onClick={this.updateEmployee}>Update</Button>
                    </ModalInputWrapper>
                </StyledModal>
            </Modal>
        );
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
    private updateEmployee(): void {
        if (!this.isValidInputs()) {
            return;
        }

        const birthDate = this.birthDate || '1';
        const date = new Date(+this.birthYear, +this.birthMonth, +birthDate);
        store.updateEmployee(
            this.props.employee.id,
            this.companyId,
            this.firstName,
            this.lastName,
            date.toString(),
            this.jobArea,
            this.jobType,
            this.jobTitle
        );
        this.props.onClose();
    }

    private isValidInputs(): boolean {
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