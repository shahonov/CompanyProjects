import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class App extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <div>
        AppTsx
      </div>
    );
  }
}