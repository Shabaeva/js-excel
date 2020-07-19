import {TABLE_RESIZE} from './type';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data,
    };
}
