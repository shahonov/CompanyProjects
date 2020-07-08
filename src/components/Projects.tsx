import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, toJS, action } from 'mobx';
import store from '../data/Store';
import { Project } from '../models/Project';
import { FiltersLayout } from './FiltersLayout';
import { ProjectCard } from './sub-components/ProjectCard';

@observer
export class Projects extends React.PureComponent {

    @observable private name: string = '';
    @observable private department: string = '';

    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='project' filterProjects={this.applyFilters}>
                {
                    this.projects.map((x, i) => {
                        return <ProjectCard key={i} project={x} />
                    })
                }
            </FiltersLayout>
        );
    }

    private get projects(): Project[] {
        let projects = toJS(store.projects);
        if (this.name !== '') {
            projects = projects.filter(x => x.name.toLowerCase().includes(this.name));
        }
        if (this.department !== '') {
            projects = projects.filter(x => x.department.toLowerCase().includes(this.department));
        }
        
        return projects;
    }

    @action.bound
    private applyFilters(name: string, business: string): void {
        this.name = name.toLowerCase();
        this.department = business.toLowerCase();
    }
}