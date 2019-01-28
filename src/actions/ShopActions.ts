import { ShopApi, RemoteData } from 'common/types';

export type ShopAction =
    UpdateShopsInfo |
    UpdateActiveShop;

export interface UpdateShopsInfo {
    type: 'UPDATE_SHOPS_INFO',
    shops: RemoteData<ShopApi[]>,
}

export interface UpdateActiveShop {
    type: 'UPDATE_ACTIVE_SHOP',
    shop: ShopApi,
}

export const updateActiveShop = (shop: ShopApi): UpdateActiveShop => {
    return{
        type: 'UPDATE_ACTIVE_SHOP',
        shop
    };
};

export const updateShopsInfo = (shops: RemoteData<ShopApi[]> ): UpdateShopsInfo => {
    return {
        type: 'UPDATE_SHOPS_INFO',
        shops,
    };
};