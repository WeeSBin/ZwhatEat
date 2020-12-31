/**
 * weSBin Kanban library
 * @description 테이블 공통 js
 */

function Kanban(config) {
    /**
     * @description 칸반 보드에서 활용할 각종 설정 값
     * @type {{targetId: string, event: {}, group: Array}}
     */
    this.config = {
        targetId: '', // 칸반 보드가 생길 태그
        group: [], // 컬럼 리스트
        event: {

        }
    };
    /**
     * @description 칸반 보드에 담길 데이터 리스트
     * @type {Array}
     */
    let data = [];
    this.setData = function (dataList) {
        data = dataList;
        this.fillBoard();
    };
    this.getData = function () {
        return data;
    };

    const tagFactory = {
        div: function (className) {
            const _div = document.createElement('div');
            setAttributes(_div, {

            })
        },
        plusBtn: function (className) {
            const _svg = document.createElement('svg');
            setAttributes(_svg, {
                class: className,
                name: 'kanban-button-add',
                version: '1.1',
                width: '16',
                height: '16',
                'aria-hidden': 'true'
            });
            return _svg;
        }
    };
    this.printTag = function (tagName, config) {
        return tagFactory[tagName](
            config.className || ''
        );
    };
    /**
     * Constructor
     */
    if (_.isPlainObject(config)) {
        this.config = config;
    }
}

/**
 * Common Util
 */
/**
 * @param el {HTMLElement}
 * @param attrs {Object.<String, String>}
 */
function setAttributes(el, attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
    })
}
/**
 * Prototype
 */
Kanban.prototype.setConfig = function (config) {
    this.config = config;
};
Kanban.prototype.getConfig = function () {
    return this.config;
};
Kanban.prototype.setGroup = function (group) {
    // todo _ 에 대한 검증 필요
    if (_.isArray(group)) {
        this.config.group = group;
    }
};
Kanban.prototype.getGroup = function () {
    return this.config.group;
};
Kanban.prototype.makeBoard = function () {
    // todo 각 태그, 버튼 등을 한곳에서 관리해야 편하지 않을까? => tagBuilder 진행 중
    const targetId = this.config.targetId;
    if (!targetId) return false;
    const innerHtml = []; // 타겟 태그 안에 들어갈 보드 HTML
    const groupList = this.config.group; // 그룹 리스트
    // 전체 보드 생성 #s
    innerHtml.push('<div class="board" name="board">');
        groupList.forEach((group, index) => {
            /**
             * @param group {Object.<string, string>}
             * @param group._id 그룹 고유 번호
             * @param group.name 그룹 이름
             */
            // 그룹 바탕 #s
            innerHtml.push('<div class="group" id="group-' + group._id + '">');
                // 그룹 상단 #s
                innerHtml.push('<div class="header">');
                innerHtml.push('<header>' + group.name + '</header>');
                innerHtml.push(
                    '<svg name="kanban-button-config" class="float-right" version="1.1" width="16" height="16" aria-hidden="true">' +
                    '<path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>' +
                    '</svg>'
                );
                innerHtml.push(
                    '<svg name="kanban-button-add" class="float-right" version="1.1" width="16" height="16" aria-hidden="true">' +
                    '<path fill-rule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>' +
                    '</svg>'
                );
                innerHtml.push('</div>');
                // 그룹 상단 #e
                // 메뉴 추가 폼 #s
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
                // 메뉴 추가 폼 #e
            innerHtml.push('</div>');
            // 그룹 바탕 #e
        });
    innerHtml.push('</div>');
    // 전체 보드 생성 #e
    document.getElementById(targetId).innerHTML = innerHtml.join('');

    defaultEvent();
};
Kanban.prototype.fillBoard = function () {
    const board = document.getElementById(this.config.targetId).children.namedItem('board');
    const dataList = this.getData();
    dataList.forEach((data, index) => {
        /**
         * @param data {Object.<string, string>}
         * @param data.group 해당 데이터가 속한 그룹
         */
        const innerHtml = [];
        const group = board.children.namedItem('group-' + data.group);
        if (!group) return;
        innerHtml.push('<article class="job">');
        innerHtml.push('<div class="p-8">');
        innerHtml.push('<h2>' + data.name + '</h2>');
        innerHtml.push('</div>');
        innerHtml.push('</article>');
        group.insertAdjacentHTML('beforeend', innerHtml.join(''));
    });
};

function defaultEvent() {
    document.getElementsByName('kanban-button-add').forEach((element) => {
        element.addEventListener('click', function (e) {
            const result = this.toggleAttribute("on");
            if (result) {
                this.parentNode.nextSibling.style.display = 'block'
            } else {
                this.parentNode.nextSibling.style.display = 'none'
            }
        });
    });
}

export {Kanban};
