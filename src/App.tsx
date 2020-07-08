import * as React from 'react';
import { TopMenu } from './components/TopMenu';
import { MenuContainer } from './styled-components/Containers';

export class App extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <MenuContainer>
        <TopMenu />
      </MenuContainer>
    );
  }
}