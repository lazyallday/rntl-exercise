import { ViewState } from 'services/types';
import { ViewAction } from 'actions';

const INITIAL_STATE: ViewState = {
    sideBarOpen: false,
};

export default (state: ViewState = INITIAL_STATE, action: ViewAction): ViewState => {
    switch (action.type) {
        case 'TOGGLE_SIDE_BAR':
            const sideBarOpen = state.sideBarOpen;
            return { ...state, sideBarOpen: !sideBarOpen };
        default:
            return state;
    }
};