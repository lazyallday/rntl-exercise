import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles, WithStyles } from '@material-ui/core';
import reducers from 'reducers';

import AppRouter from 'views/AppRouter';

import theme from 'styles/theme';
import globalStyles from 'styles/global';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const AppRoot = (props: WithStyles<typeof globalStyles>) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <AppRouter />
      </MuiThemeProvider>
    </Provider>
  );
};

const AppRootWithStyles = withStyles(globalStyles)(AppRoot);

ReactDOM.render(
  <AppRootWithStyles />,
  document.getElementById('root') as HTMLElement
);
