/**
 * weSBin Table library
 * @description table common js
 */
function Table() {
    this.config = {};
    let data = [];
    /**
     * @description data is content for table
     * @param {Array.<Object.<string, *>>} data
     */
    this.setData = function (dataList) {
        data = dataList;
    };
    /**
     * @description get Data
     */
    this.getData = function () {
        return data;
    };
};
/**
 * @description {targetId: string}
 * @param {Object.<string, string>} config
 */
Table.prototype.setConfig = function (config) {
    this.config = config;
};
/**
 * @description get Config
 * @returns {Ob/ject.<string, string>}
 */
Table.prototype.getConfig = function () {
    return this.config;``
};
/**
 * @description make table
 */
Table.prototype.makeTable = function () {
    if (!this.config.targetId) return false;
    const table = document.getElementById(this.config.targetId);
    const data = this.getData();
    data.forEach(function (content) {
        const _tr = document.createElement('tr');
        for (let contentKey in content) {
            const _td = document.createElement('td');
            _td.textContent = content[contentKey];
            _tr.appendChild(_td);
        }
        table.appendChild(_tr);
    });
};


export {Table};