import * as React from 'react';
import { ContentWrapper } from '../styled-components/Containers';

export class Home extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <ContentWrapper>
                <h2>Company Projects</h2>
                <hr />
                <h4>Application models:</h4>
                <ul>
                    <li>
                        <p>Company</p>
                        <ul>
                            <li>ID</li>
                            <li>Name</li>
                            <li>Business</li>
                            <li>Slogan</li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        <p>Project</p>
                        <ul>
                            <li>Name</li>
                            <li>Department</li>
                            <li>CompanyID</li>
                            <li>EmployeesIDs</li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        <p>Employee</p>
                        <ul>
                            <li>ID</li>
                            <li>CompanyID</li>
                            <li>FirstName</li>
                            <li>LastName</li>
                            <li>DateOfBirth</li>
                            <li>JobArea</li>
                            <li>JobType</li>
                            <li>JobTitle</li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <h4>Application provides following functionalities for each model:</h4>
                <ul>
                    <li>Filter</li>
                    <li>Read</li>
                    <li>Update</li>
                    <li>Create</li>
                    <li>Delete</li>
                </ul>
                <hr />
                <h4>Restrictions:</h4>
                <ul>
                    <li>No model can be updated with empty value.</li>
                </ul>
            </ContentWrapper>
        );
    }
}