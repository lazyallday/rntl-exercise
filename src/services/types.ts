import { ShopApi, UserApi, Languages, RemoteData } from 'common/types';

export interface ReduxState {
    auth: AuthState,
    user: UserState,
    shops: ShopState,
    lang: Languages,
    view: ViewState,
}

export type AuthState = LoginStatus<AuthInfo>;

export type LoginStatus<T> =
    { userLoaded: false } |
    { userLoaded: true, loggedIn: false } | 
    { userLoaded: true, loggedIn: true, data: T };

export interface AuthInfo {
    email: string | null,
    uid: string,
    photoURL: string | null,
    isAnonymous: boolean,
}

export type UserState = RemoteData<UserApi>;

export interface ViewState {
    sideBarOpen: boolean,
}

export interface ShopState {
    shops: RemoteData<ShopApi[]>,
    activeShop?: ShopApi,
}