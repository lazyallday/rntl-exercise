import { AuthState, UserState } from 'services/types';
import { ShopApi, UserApi, RemoteData } from 'common/types';
import { db } from 'services/firebase';
import { ThunkAction } from './index';
import { UpdateShopsInfo, UpdateActiveShop, updateActiveShop, updateShopsInfo } from './ShopActions';

import { User } from 'firebase';

export type UserAction =
    UpdateLoginState |
    UpdateUserInfo |
    UpdateShopsInfo |
    UpdateActiveShop |
    UserLogout;

interface UpdateLoginState {
    type: 'UPDATE_LOGIN_STATE',
    auth: AuthState,
}

interface UserLogout {
    type: 'USER_LOGOUT'
}

interface UpdateUserInfo {
    type: 'UPDATE_USER_INFO',
    user: UserState,
}

const updateLoginState = (auth: AuthState ): UpdateLoginState => {
    return {
        type: 'UPDATE_LOGIN_STATE',
        auth,
    };
};

export const updateAuthInfo = (user: User | null): ThunkAction<UserAction> => {
    return (dispatch, getState) => {
        let auth: AuthState = { userLoaded: true, loggedIn: false };
        if (user) {
            const { uid, email, isAnonymous, photoURL } = user;
            auth = {
                ...auth, 
                loggedIn: true,
                data: {
                    uid,
                    email,
                    isAnonymous,
                    photoURL
                } 
            };
            dispatch(getUserAndShopInfo(uid));
        } else {
            dispatch({
                type: 'USER_LOGOUT'
            });
        }
        dispatch(updateLoginState(auth));
    };
};

const updateUserInfo = (user: UserState ): UpdateUserInfo => {
    return {
        type: 'UPDATE_USER_INFO',
        user,
    };
};

export const getUserAndShopInfo = (uid: string): ThunkAction<UserAction> => {
    return async (dispatch, getState) => {
        let activeShopId: string = '';
        const userRef = db.collection('users').doc(uid);
        try {
            const userDoc = await userRef.get();
            if (userDoc.exists) {
                const userData: UserApi = userDoc.data() as UserApi;
                const user: UserState = { kind: 'FETCHED', data: userData };
                if (userData.activeShopId) {
                    activeShopId = userData.activeShopId;
                }
                dispatch(updateUserInfo(user));
            } else {
                const user: UserState = { kind: 'ERROR', error: 'No user found' };
                dispatch(updateUserInfo(user));
            }
        } catch (error) {
            const user: UserState = { kind: 'ERROR', error: error.message || 'Error getting user info' };
            dispatch(updateUserInfo(user));
        }
        const shopRef = db.collection('shops');
        try {
            const querySnapshot = await shopRef.where(`users.${uid}`, '==', true).get();
            const shopsArray: ShopApi[] = [];
            for (const shopDoc of querySnapshot.docs) {
                if (!activeShopId) {
                    activeShopId = shopDoc.id;
                }
                const shopData = shopDoc.data() as ShopApi;
                shopsArray.push(shopData);
                if (shopDoc.id === activeShopId) {
                    dispatch(updateActiveShop(shopData));
                }
            }
            const shops: RemoteData<ShopApi[]> = { kind: 'FETCHED', data: shopsArray };
            dispatch(updateShopsInfo(shops));
        } catch (error) {
            const shops: RemoteData<ShopApi[]> = { kind: 'ERROR', error: error.message || 'Error getting shops info' };
            dispatch(updateShopsInfo(shops));
        }
    };
};