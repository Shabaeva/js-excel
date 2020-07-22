// Pure function
import {TABLE_RESIZE} from './type';

export function rootReducer(state, action) {
    let prevState;
    let field;
    console.log(action);
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'column' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.data.id] = action.data.value;
            return {...state, [field]: prevState}; // id, value
        default: return state;
    }
}
