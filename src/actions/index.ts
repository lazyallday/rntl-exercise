export * from './UserActions';
export * from './ViewActions';
export * from './ShopActions';
import { ReduxState } from 'services/types';
import { auth } from 'services/firebase';

export interface ErrorObject {
    kind: 'Error',
    error?: string,
}

export interface AuthError {
    type: 'AUTH_ERROR',
    authError: string,
}

export const authError = (): AuthError => {
    auth.signOut();
    return {
        type: 'AUTH_ERROR',
        authError: 'Authentication error',
    };
};

export type ThunkAction<A> = (dispatch: (action: A | ThunkAction<A>) => void, getState: () => ReduxState) => void;