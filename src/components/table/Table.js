import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table_resize';
import {isCell, matrix, shouldResize, nextSelector} from './table_functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options,
        });
    }

    prepare() {
        super.prepare();
        this.selection = new TableSelection();
    }

    toHTML() {
        return createTable(20);
    }

    init() {
        super.init();
        this.selection = new TableSelection();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.$on('formula:input', (text) => {
            this.selection.current.text(text);
        });
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                // eslint-disable-next-line max-len
                const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selection.select($next);
        }
    }
}
