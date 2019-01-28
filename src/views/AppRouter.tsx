import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from 'firebase';

import { AuthState, ReduxState, UserState } from 'services/types';
import { Languages } from 'common/types';
import history from 'services/history';
import AuthRoute from 'components/AuthRoute';
import Home from './Home';
import Login from './Login';
import NotFound from './404';
import { auth as fbAuth } from 'services/firebase';
import { updateAuthInfo } from 'actions';
import Spinner from 'components/Spinner';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from 'components/Container';
import { strings } from 'localization';

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';

interface StateToProps {
  auth: AuthState,
  lang: Languages,
  user: UserState,
}

interface DispatchProps {
  updateAuthInfo: (user: User | null) =>  void,
}

type Props = StateToProps & DispatchProps & WithStyles<typeof styles>;

class AppRouter extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
      // Check if user has logged in or not
      fbAuth.onAuthStateChanged((user) => {
        this.props.updateAuthInfo(user);
      });
  }

  render() {
    const { classes, user } = this.props;
    const authInfo = this.props.auth;
    // Show loading screen if... User not loaded OR user loaded and logged in, but user info is not loaded
    if (!authInfo.userLoaded || (authInfo.userLoaded && authInfo.loggedIn && user.kind === 'LOADING')) {
      return (
        <Spinner in={true} />
      );
    }
    if (user.kind === 'ERROR') {
      return (
        <Container>
          <Typography variant="headline" gutterBottom>{strings.auth.userError}.</Typography>
          <Button variant="contained" color="primary" onClick={() => fbAuth.signOut()}>{strings.auth.logOut}</Button>
        </Container>
      );
    }
    return (
        <div id="app" className={classes.app}>
          <Router history={history}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/404" component={NotFound} />
              <AuthRoute path="/" component={Home} />
            </Switch>
          </Router>
        </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  app: {
    height: '100%'
  },
});

const mapStateToProps = ({ auth, lang, user }: ReduxState): StateToProps => {
    return { auth, lang, user };
};

export default withStyles(styles)(connect(mapStateToProps, { updateAuthInfo })(AppRouter));
