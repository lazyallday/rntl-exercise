import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { auth } from 'services/firebase';

const AuthRoute: React.SFC<RouteProps> = ({ component: Component, render, ...rest }) => {

    if (!auth.currentUser) {
        const loginRedirect = {
            to: {
              pathname: '/login',
            },
        };
        const redirect = () => <Redirect {...loginRedirect} />;
        return <Route {...rest} render={redirect} />;
    }

    if (Component) {
        return <Route {...rest} render={(props) => <Component {...props}/>} />;
      } else {
        return <Route {...rest} render={render} />;
    }
};

export default AuthRoute;
