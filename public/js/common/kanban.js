/**
 * weSBin Kanban library
 * @description 테이블 공통 js
 * @param {Object} config {
 *     targetId: <string>,
 *     column: [Object<string, string>]
 * }
 */
function Kanban(config) {
    this.config = {
        targetId: '', // 칸반 보드가 생길 태그
        column: [] // 컬럼 리스트
    };
    let data = []; // 칸반 보드에 담길 데이터 리스트
    this.setData = function (dataList) {
        data = dataList;
        this.fillBoard();
    };
    this.getData = function () {
        return data;
    };
    if (_.isPlainObject(config)) {
        this.config = config;
        this.makeBoard();
    }
}
Kanban.prototype.setConfig = function (config) {
    this.config = config;
};
Kanban.prototype.getConfig = function () {
    return this.config;
};
Kanban.prototype.setColumn = function (column) {
    if (_.isArray(column)) {
        this.config.column = column;
    }
};
Kanban.prototype.getColumn = function () {
    return this.config.column;
};
Kanban.prototype.makeBoard = function () {
    const targetId = this.config.targetId;
    if (!targetId) return false;

    //todo 1. column 데이터 세팅
    //  2. article 데이터 세팅

    const innerHtml = [];
    innerHtml.push('<div class="board">');

        innerHtml.push('<div class="column backlog">');

            innerHtml.push('<div class="header">');
            innerHtml.push('<header>Back Log</header>');
            innerHtml.push(
                '<svg class="float-right" version="1.1" width="16" height="16" aria-hidden="true">' +
                '<path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>' +
                '</svg>'
            );
            innerHtml.push(
                '<svg class="float-right" version="1.1" width="16" height="16" aria-hidden="true">' +
                '<path fill-rule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>' +
                '</svg>'
            );
            innerHtml.push('</div>');

            innerHtml.push('<div class="form" style="display: none;">');
            innerHtml.push(
                '<label>' +
                '<textarea placeholder="Enter a menu"></textarea>' +
                '</label>'
            );
            innerHtml.push('<div class="dp-flex">');
            innerHtml.push('<button type="button" class="add">Add</button>');
            innerHtml.push('<button type="button" class="cancel">Cancel</button>');
            innerHtml.push('</div>');
            innerHtml.push('</div>');

        innerHtml.push('</div>');

    innerHtml.push('</div>');
    document.getElementById(targetId).innerHTML = innerHtml.join('');
};
Kanban.prototype.fillBoard = function () {
    if (!this.config.targetId) return false;
    const table = document.getElementById(this.config.targetId);
    table.innerHTML = "";
    const data = this.getData();
    data.forEach(function (content) {
        const _tr = document.createElement('tr');
        for (const contentKey in content) {
            if (content.hasOwnProperty(contentKey)) {
                const _td = document.createElement('td');
                _td.textContent = content[contentKey];
                _tr.appendChild(_td);
            }
        }
        table.appendChild(_tr);
    });
};

export {Kanban};
