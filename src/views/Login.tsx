import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Container from 'components/Container';

import { auth } from 'services/firebase';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Spinner from 'components/Spinner';
import { strings } from 'localization';

interface State {
    email: string,
    password: string,
    error: string,
    loading: boolean,
    redirectAfterLogin: boolean,
}

type Props = RouteComponentProps<{}> & WithStyles<typeof styles>;

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      redirectAfterLogin: false,
    };
  }

  handleEmailChange = (event: InputEvent) => {
    const value = event.target.value;
    this.setState({
      email: value,
    });
  }

  handlePasswordChange = (event: InputEvent) => {
    const value = event.target.value;
    this.setState({
      password: value,
    });
  }

  login = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const text = strings.login; 
      this.setState({ error: '', loading: true });
      const { email, password } = this.state;
      auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.setState({
            error: '',
            password: '',
            email: '',
            loading: false,
            redirectAfterLogin: true,
          });
        })
        .catch((err: any) => {
          this.setState({
            error: text.error + '. \n' + err.message,
            loading: false
          });
      });
  }

  render() {
    const text = strings.login;
    const { from } = this.props.location && this.props.location.state || { from: { pathname: '/' } };
    const { email, password, error, redirectAfterLogin, loading } = this.state;
    const classes = this.props.classes;

    if (redirectAfterLogin) {
      return <Redirect to={from} />;
    }

    return (
      <Container className={classes.root}>
        <Typography variant="headline" align="center" className={classes.logoWrapper}>Rentle</Typography>
        <Typography variant="display1" align="center" className={classes.header}>{text.login}</Typography>
        <form onSubmit={this.login}>
          <TextField
            id="email"
            label={text.email}
            name="email"
            className={classes.textField}
            value={email}
            onChange={this.handleEmailChange}
            margin="normal"
            type="text"
            required
          />
          <TextField
            id="password"
            label={text.password}
            name="password"
            className={classes.textField}
            value={password}
            onChange={this.handlePasswordChange}
            margin="normal"
            type="password"
            required
          />
          <div className="error">{error}</div>
          <Button className={classes.loginBtn} variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <Spinner padding={8} thickness={4}/> : text.btn}
          </Button>
        </form>
      </Container>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  logoWrapper: {
    paddingBottom: 32,
    maxWidth: '100%',
  },
  header: {
    marginBottom: 32
  },
  loginBtn: {
    display: 'block',
    margin: '16px auto',
    minWidth: 120,
    height: 36,
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    display: 'flex',
  },
});

export default withStyles(styles)(Login);
