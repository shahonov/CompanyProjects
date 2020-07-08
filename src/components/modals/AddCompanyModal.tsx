import * as React from 'react';
import styled from 'styled-components';
import { TextField, Modal, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import store from '../../data/Store';
import { Company } from '../../models/Company';
import { CompanyAddress } from '../../models/CompanyAddress';

const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #EEE;
    border: 1px solid white;
    box-shadow: 1px 1px 5px black;
    padding: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 5px 0;
`;

const Input = styled(TextField)`
    width: 100%;
`;

export interface Props {
    isOpen: boolean;
    onClose: () => void;
}

@observer
export class AddCompanyModal extends React.Component<Props> {

    @observable private addCompanyName: string = '';
    @observable private addCompanyBusiness: string = '';
    @observable private addCompanySlogan: string = '';
    @observable private addCompanyCountry: string = '';
    @observable private addCompanyCity: string = '';
    @observable private addCompanyState: string = '';
    @observable private addCompanyStreet: string = '';

    public render(): React.ReactNode {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Add New Company</h2>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="Name"
                            variant="outlined"
                            value={this.addCompanyName}
                            onChange={this.handleChangeName} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="Business"
                            variant="outlined"
                            value={this.addCompanyBusiness}
                            onChange={this.handleChangeBusiness} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="Slogan"
                            variant="outlined"
                            value={this.addCompanySlogan}
                            onChange={this.handleChangeSlogan} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="Country"
                            variant="outlined"
                            value={this.addCompanyCountry}
                            onChange={this.handleChangeCountry} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="State"
                            variant="outlined"
                            value={this.addCompanyState}
                            onChange={this.handleChangeState} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="City"
                            variant="outlined"
                            value={this.addCompanyCity}
                            onChange={this.handleChangeCity} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            size='small'
                            label="Street"
                            variant="outlined"
                            value={this.addCompanyStreet}
                            onChange={this.handleChangeStreet} />
                    </InputWrapper>
                    <InputWrapper>
                        <Button
                            size='large'
                            variant="outlined"
                            onClick={this.addNewCompany}>Add</Button>
                    </InputWrapper>
                </StyledModal>
            </Modal>
        );
    }

    @action.bound
    private handleChangeName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyName = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeBusiness(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyBusiness = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeSlogan(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanySlogan = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCountry(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyCountry = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeState(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyState = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCity(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyCity = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeStreet(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.addCompanyStreet = ev.currentTarget.value;
    }

    @action.bound
    private addNewCompany(): void {
        const id = store.nextId().toString();
        const company = {
            name: this.addCompanyName,
            business: this.addCompanyBusiness,
            slogan: this.addCompanySlogan,
            id: id
        } as Company;

        const companyAddress = {
            country: this.addCompanyCountry,
            state: this.addCompanyState,
            city: this.addCompanyCity,
            street: this.addCompanyStreet,
            id: store.nextId().toString(),
            companyId: id
        } as CompanyAddress;

        const response = store.addCompany(company);
        if (!response.isSuccess) {
            alert(response.message);
        } else {
            store.companyAddresses.push(companyAddress);
            this.props.onClose();
        }
    }
}