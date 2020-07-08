import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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
            <div>Add Project</div>
        )
    }
}