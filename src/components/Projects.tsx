import * as React from 'react';
import store from '../data/Store';
import { FiltersLayout } from './FiltersLayout';
import { ProjectCard } from './sub-components/ProjectCard';

export class Projects extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <FiltersLayout filter='project'>
                {
                    store.projects.map(x => {
                        return <ProjectCard project={x} />
                    })
                }
            </FiltersLayout>
        );
    }
}