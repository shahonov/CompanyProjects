import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, toJS, action, runInAction } from 'mobx';
import { Modal, Button } from '@material-ui/core';
import store from '../../data/Store';
import { Company } from '../../models/Company';
import { CompanyAddress } from '../../models/CompanyAddress';
import { ModalInput } from './styled-components/ModalInputs';
import { StyledModal } from './styled-components/StyledModal';
import { ModalInputWrapper } from './styled-components/ModalInputWrapper';

export interface Props {
    isOpen: boolean;
    company: Company;
    onClose: () => void;
}

@observer
export class EditCompanyModal extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        // this is necessary because company addresses 
        // are not loaded initially and will always return undefined
        setTimeout(() => {
            runInAction(() => {
                this.country = this.companyAddress()?.country ?? '';
                this.companyState = this.companyAddress()?.state ?? '';
                this.city = this.companyAddress()?.city ?? '';
                this.street = this.companyAddress()?.street ?? '';
            });
        }, 500);
    }

    @observable private name: string = toJS(this.props.company.name);
    @observable private business: string = toJS(this.props.company.business);
    @observable private slogan: string = toJS(this.props.company.slogan);
    @observable private country: string = '';
    @observable private city: string = '';
    @observable private companyState: string = '';
    @observable private street: string = '';

    public render(): React.ReactNode {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.onClose}>
                <StyledModal>
                    <h2 style={{ textAlign: 'center' }}>Edit Company</h2>
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
                            label="Business"
                            variant="outlined"
                            value={this.business}
                            onChange={this.handleChangeBusiness} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Slogan"
                            variant="outlined"
                            value={this.slogan}
                            onChange={this.handleChangeSlogan} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Country"
                            variant="outlined"
                            value={this.country}
                            onChange={this.handleChangeCountry} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="State"
                            variant="outlined"
                            value={this.companyState}
                            onChange={this.handleChangeState} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="City"
                            variant="outlined"
                            value={this.city}
                            onChange={this.handleChangeCity} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <ModalInput
                            size='small'
                            label="Street"
                            variant="outlined"
                            value={this.street}
                            onChange={this.handleChangeStreet} />
                    </ModalInputWrapper>
                    <ModalInputWrapper>
                        <Button
                            size='large'
                            variant="outlined"
                            onClick={this.updateCompany}>Update</Button>
                    </ModalInputWrapper>
                </StyledModal>
            </Modal>
        );
    }

    private companyAddress(): CompanyAddress | undefined {
        const companyAddress = store.companyAddresses.find(x => x.companyId === this.props.company.id);
        return companyAddress;
    }

    @action.bound
    private handleChangeName(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.name = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeBusiness(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.business = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeSlogan(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.slogan = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCountry(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.country = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeState(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.companyState = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeCity(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.city = ev.currentTarget.value;
    }

    @action.bound
    private handleChangeStreet(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.street = ev.currentTarget.value;
    }

    @action.bound
    private updateCompany(): void {
        if (!this.isValidInputs()) {
            return;
        }

        store.updateCompany(
            this.props.company.id,
            this.name,
            this.business,
            this.slogan
        );
        store.updateCompanyAddress(
            this.companyAddress()?.id ?? '',
            this.country,
            this.companyState,
            this.city,
            this.street
        );
        this.props.onClose();
    }

    private isValidInputs(): boolean {
        if (this.name === '') {
            alert('You must enter name.');
            return false;
        } else if (this.business === '') {
            alert('You must enter business.');
            return false;
        } else if (this.slogan === '') {
            alert('You must enter slogan.');
            return false;
        } else if (this.country === '') {
            alert('You must enter country.');
            return false;
        } else if (this.state === '') {
            alert('You must enter state.');
            return false;
        } else if (this.city === '') {
            alert('You must enter city.');
            return false;
        } else if (this.street === '') {
            alert('You must enter street.');
            return false;
        }

        return true;
    }
}