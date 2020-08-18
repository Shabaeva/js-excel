import {storage} from '@core/utils';

export function toHtml(key) {
    const model = storage(key);
    const id = key.split(':')[1];
    return `
       <li class="db__record">
           <a href="#excel/${id}">${model.title}</a>
           <strong>12.06.2020</strong>
       </li>  
    `;
}

function getAllKeys() {
    const keys = [];
    for (let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
    if (!key.includes('excel')) {
        continue;
    } else {
        keys.push(key);
    }
    }
    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();
    console.log('keys', keys);
    if (!keys.length) {
        return `<p>You don't have a table</p>`;
    } else {
        return `
         <div class="db__list-header">
                <span>Title</span>
                <span>Create date</span>
            </div>
            <ul class="db__list">
                ${keys.map(toHtml).join('')}
            </ul>
    `;
    }
}
