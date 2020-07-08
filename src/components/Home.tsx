import * as React from 'react';
import { ContentWrapper } from '../styled-components/Containers';

export class Home extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <ContentWrapper>
                <h1>Company Projects</h1>
                <h3>Application Notes:</h3>
                <ul>
                    <hr />
                    <li>
                        <p>has initial companies, projects and employees</p>
                    </li>
                    <hr />
                    <li>
                        <p>each company have:</p>
                        <ul>
                            <li>address</li>
                            <li>name</li>
                            <li>business </li>
                            <li>slogan</li>
                            <li>(can have) many projects</li>
                            <li>(can have) many employees</li>
                        </ul>
                    </li>
                    <hr />
                    <li>
                        <p>each project have:</p>
                        <ul>
                            <li>name </li>
                            <li>department</li>
                            <li>(can have) many employees </li>
                        </ul>
                    </li>
                    <hr />
                    <li>
                        <p>each employee have:</p>
                        <ul>
                            <li>first name</li>
                            <li>last name</li>
                            <li>company, he&#39;s working on</li>
                            <li>date of birth</li>
                            <li>job title</li>
                            <li>job type</li>
                            <li>job area</li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <h4>Manage options:</h4>
                <ul>
                    <li>Can be added:
                        <ul>
                            <li>Companies</li>
                            <li>Projects</li>
                            <li>Employees</li>
                        </ul>
                    </li>
                    <br />
                    <li>Can be deleted:
                        <ul>
                            <li>Companies</li>
                            <li>Projects</li>
                            <li>Employees</li>
                        </ul>
                    </li>
                    <br />
                    <li>Can be edited:
                        <ul>
                            <li>Companies</li>
                            <li>Projects</li>
                            <li>Employees</li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <h4>Filater options:</h4>
                <ul>
                    <li>Each cards (company, project, employee) can be filtered to be received extracted results</li>
                </ul>
            </ContentWrapper>
        );
    }
}