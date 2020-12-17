/**
 * Request to server
 *
 * @param {string} method POST, GET, PUT, DELETE
 * @param {string} module 원하는 router 를 선택
 * @param {string} task router 안의 실행을 원하는 task 를 선택
 * @param {Object} data task 에 전달될 data
 * @param {Function} callback 요청이 완료되면 실행될 function
 */
export function request(method, module, task, data, callback) {

    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) return false;
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open(method, '/');
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    var body = {
        module: module,
        task: task,
        data: data
    };
    httpRequest.send(JSON.stringify(body));

    function alertContents() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    try {
                        callback(JSON.parse(httpRequest.response));
                    } catch (e) {
                        alert('json 이 아니야?' + e.description);
                    }
                } else {
                    alert('어찌 에러가 났을까?' + httpRequest.responseText);
                }
            }
        } catch (e) {
            alert('서버가 꺼졌을까?' + e.description);
        }
    }
}