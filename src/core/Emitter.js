export class Emitter {
    constructor() {
        this.listeners = {};
    }
    // dispatch, trigger, fire
    // notice listeners
    // table.emmit('table:select', {a: 1)
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
            this.listeners[event].forEach((listener) => {
                listener(...args);
            });
        return true;
    }
    // on, listen
    // subscribe on notifications or add new listener
    // formula subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] =
                this.listeners[event].filter((listener) => listener !== fn);
        };
    }
}
// example
// const emitter = new Emitter();
// const unsub = emitter.subscribe('katya', (data) => console.log('sub', data));
// emitter.emit('katya', 42);
//
// setTimeout(() => {
//     emitter.emit('katya', 'after 2 sec');
// }, 2000);
//
// setTimeout(() => {
//     unsub();
// }, 3000);
//
// setTimeout(() => {
//     emitter.emit('katya', 'after 4 sec');
// }, 4000);
