import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderBar from 'components/HeaderBar';
import SideBar from 'components/SideBar';
import Reports from './Reports';
import { toggleSideBar } from 'actions';
import { ReduxState, ViewState, ShopState } from 'services/types';
import { Languages } from 'common/types';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import { strings } from 'localization';

interface StateToProps {
  lang: Languages,
  view: ViewState,
  shops: ShopState
}

interface DispatchProps {
  toggleSideBar: () => void,
}

const notFoundRedirect = {
  to: {
    pathname: '/404',
  },
};

type Props = StateToProps & DispatchProps & RouteComponentProps<{}> & WithStyles<typeof styles>;

class Home extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    const redirect = () => <Redirect {...notFoundRedirect} />;
    const shops = this.props.shops;
    if (shops.shops.kind === 'LOADING' || (shops.shops.kind === 'FETCHED' && !shops.activeShop)) {
        return (
          <Spinner in={true} />
        );
    }
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <HeaderBar />
        </div>
        <div className={classes.main}>
          {shops.shops.kind === 'ERROR' ?
            <Container>
              <Typography variant="headline" align="center">
                {strings.auth.shopError}
              </Typography>
            </Container>
          :
            <Switch>
              <Route exact={true} path="/" component={Reports} />
              <Route path="/reports" component={Reports} />
              <Route render={redirect} />
            </Switch>
          }
        </div>
        <SideBar />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fafafa',
    minHeight: '100%',
  },
  header: {
    width: '100%',
    flex: '0 0 auto',
  },
  main: {
    flex: '1 1 auto',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    overflow: 'auto',
  },
});

const mapStateToProps = ({ lang, view, shops }: ReduxState): StateToProps => {
  return { lang, view, shops };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, { toggleSideBar })(Home)));
