// Pure function
import {CHANGE_TEXT, TABLE_RESIZE} from './type';

export function rootReducer(state, action) {
    let prevState;
    let field;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'column' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.data.id] = action.data.value;
            return {...state, [field]: prevState}; // id, value
        case CHANGE_TEXT:
            prevState = state['dataState'] || {};
            prevState[action.data.id] = action.data.value;
            return {...state,
                currentText: action.data.value, dataState: prevState};
        default: return state;
    }
}
