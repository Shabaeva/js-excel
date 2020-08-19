export function createStore(rootReducer, initialSate = {}) {
    let state = rootReducer({...initialSate}, {type: '__INIT__'});
    let listeners = [];

    return {
        subscribe(fn) {
            listeners.push(fn);
            return {
                unsubscribe() {
                    listeners = listeners.filter((l) => l !== fn);
                },
            };
        },
        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach((listener) => listener(state));
        },
        getState() {
            return JSON.parse(JSON.stringify(state));
        },
    };
}
