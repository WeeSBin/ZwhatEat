/**
 * weSBin Kanban library
 * @description 테이블 공통 js
 * @param {Object} config {
 *     targetId: <string>
 * }
 */
function Kanban(config) {
    if (_.isPlainObject(config)) {
        this.config = config;
    } else {
        this.config = {};
    }
    let data = [];
    /**
     * @param {Array.<Object<string, *>>} dataList 테이블 데이터 리스트
     */
    this.setData = function (dataList) {
        data = dataList;
        this.fillBoard();
    };
    /**
     * @returns {Array.<Object<string, *>>}
     */
    this.getData = function () {
        return data;
    };
}
/**
 * @param {Object.<string, string>} config
 */
Kanban.prototype.setConfig = function (config) {
    this.config = config;
};
/**
 * @returns {Object.<string, string>}
 */
Kanban.prototype.getConfig = function () {
    return this.config;
};
/**
 * @description 보드 만들기
 */
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