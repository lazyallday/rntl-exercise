import { ShopState } from 'services/types';
import { ShopAction } from 'actions';

const INITIAL_STATE: ShopState = {
    shops: { kind: 'LOADING' },
    activeShop: undefined,
};

export default (state: ShopState = INITIAL_STATE, action: ShopAction): ShopState => {
    switch (action.type) {
        case 'UPDATE_SHOPS_INFO':
            return { 
                ...state,
                shops: action.shops
            };
        case 'UPDATE_ACTIVE_SHOP':
            return {
                ...state,
                activeShop: action.shop,
            };
        default:
            return state;
    }
};