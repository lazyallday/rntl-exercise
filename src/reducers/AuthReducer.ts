import { AuthState } from 'services/types';
import { UserAction } from 'actions';

const INITIAL_STATE: AuthState = {
  userLoaded: false,
};

export default (state: AuthState = INITIAL_STATE, action: UserAction): AuthState => {
    switch (action.type) {
        case 'UPDATE_LOGIN_STATE':
            return { ...action.auth };
        default:
            return state;
    }
};