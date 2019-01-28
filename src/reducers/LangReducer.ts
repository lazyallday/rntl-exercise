import { Languages } from 'common/types';
import { ViewAction } from 'actions';
import { strings } from 'localization';

const INITIAL_STATE: Languages = strings.getLanguage() as Languages;

export default (state = INITIAL_STATE, action: ViewAction): Languages => {
    switch (action.type) {
        case 'UPDATE_LANGUAGE':
            return action.lang;
        default:
            return state;
    }
};