/**
 * Request to server
 *
 * @param {string} method POST, GET, PUT, DELETE
 * @param {string} url url
 * @param {Object} data task 에 전달될 data
 * @param {Function} callback 요청이 완료되면 실행될 function
 */
export function request(method, url, data, callback) {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) return false;
    httpRequest.onreadystatechange = stateChangeReaction;
    httpRequest.open(method, url);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    if (method === 'GET') {
        httpRequest.send();
    } else {
        httpRequest.send(JSON.stringify(data));
    }
    /**
     * @description 상태 변화에 따른 반응
     */
    function stateChangeReaction() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    try {
                        const res = JSON.parse(httpRequest.response);
                        if (res.hasOwnProperty('msg')) alert(res.msg);
                        callback(res);
                    } catch (e) {
                        alert('Error(1): ' + e.description);
                    }
                } else {
                    alert('Error(2): ' + httpRequest.responseText);
                }
            }
        } catch (e) {
            alert('Error(3): ' + e.description);
        }
    }
}