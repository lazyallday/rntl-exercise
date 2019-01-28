import { UserState } from 'services/types';
import { UserAction } from 'actions';

const INITIAL_STATE: UserState = { kind: 'LOADING'};

export default (state: UserState = INITIAL_STATE, action: UserAction): UserState => {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return { ...action.user };
        default:
            return state;
    }
};