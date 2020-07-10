import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubscribers = [];

        this.prepare();
    }


    // Tune component to init
    prepare() {}
    // Return component template
    toHTML() {
        return '';
    }
    // Notice listeners about event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // Subscribe event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }
    // Init component, add listeners
    init() {
        this.initDOMListeners();
    }
    // Delete component, delete listeners
    destroy() {
        this.removeDOMListereners();
        this.unsubscribers.forEach((unsub) => unsub());
    }
}
