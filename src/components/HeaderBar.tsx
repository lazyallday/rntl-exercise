import * as React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { toggleSideBar } from 'actions';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import history from 'services/history';
import BackIcon from '@material-ui/icons/ArrowBack';
import { strings } from 'localization';

interface DispatchProps {
  toggleSideBar: () => void
}

type Props = DispatchProps & WithStyles<typeof styles> & RouteComponentProps<{}>;

class HeaderBar extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const headerRoutes = [
      { path: '/', name: strings.headerBar.reports, exact: true },
      { path: '/reports', name: strings.headerBar.reports },
      { path: '/', name: strings.headerBar.rentle, back: true }
    ];
    return (
      <AppBar color="primary" position="static" className={classes.appBar}>
        <Switch>
        {headerRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={() => (
              <Toolbar className={classes.toolBar}>
                <div className={classes.flexWrapper}>
                  {route.back ?
                    <IconButton color="inherit" aria-label="Back" onClick={() => history.goBack()}>
                      <BackIcon />
                    </IconButton>
                    :
                    <IconButton color="inherit" aria-label="Menu" onClick={() => this.props.toggleSideBar()}>
                      <MenuIcon />
                    </IconButton>
                  }
                  <Typography className={classes.logo} variant="headline" color="inherit">
                    {route.name}
                  </Typography>
                </div>
              </Toolbar>
            )}
          />
        ))}
        </Switch>
      </AppBar>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  appBar: {
    marginBottom: -1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'normal'
  },
  testBox: {
    padding: '8px 16px',
    background: theme.palette.secondary.main,
  },
});

export default withStyles(styles)(withRouter(connect<{}, DispatchProps>(null, { toggleSideBar })(HeaderBar)));
