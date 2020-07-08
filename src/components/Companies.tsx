import * as React from 'react';
import store from '../data/Store';
import { CompanyCard } from './sub-components/CompanyCard';
import { ContentWrapper } from '../styled-components/Containers';

export class Companies extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <ContentWrapper>
                {
                    store.companies.map((x, i) => {
                        return <CompanyCard key={i} company={x} />
                    })
                }
            </ContentWrapper>
        );
    }
}