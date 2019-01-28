import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import LangReducer from './LangReducer';
import ViewReducer from './ViewReducer';
import ShopReducer from './ShopReducer';

const appReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    shops: ShopReducer,
    lang: LangReducer,
    view: ViewReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;