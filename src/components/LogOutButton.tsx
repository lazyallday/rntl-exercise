import * as React from 'react';
import { auth } from 'services/firebase';
import { strings } from 'localization';

const signOut = () => { auth.signOut(); };

const LogOutButton = () => (
    <div className="block-btn btn-blue" onClick={signOut}>
        {strings.auth.logOut}
    </div>
);

export default LogOutButton;