import * as React from 'react';
import { Company } from '../../models/Company';

export interface Props {
    isOpen: boolean;
    company: Company;
    onClose: () => void;
}

export class EditCompanyModal extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <div>edit comp</div>
        );
    }
}