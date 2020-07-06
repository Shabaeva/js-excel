import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table_resize';
import {matrix, shouldResize} from '@/components/table/table_functions';
import {isCell} from '@/components/table/table_functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
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
}

