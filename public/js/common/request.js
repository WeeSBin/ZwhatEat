/**
 * Request to server
 *
 * @param {string} method POST, GET, PUT, DELETE
 * @param {string} url url
 * @param {Object} data task 에 전달될 data
 * @param {Function} callback 요청이 완료되면 실행될 function
 */
export function request(method, url, data, callback) {
    const reqOption = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (method !== 'GET') {
        reqOption.body = JSON.stringify(data)
    }
    return fetch(url, reqOption)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response was not ok.')
        })
        .then(json => callbackRes(json))
        .catch(error => console.error('Error:', error));

    function callbackRes(res) {
        if (res.hasOwnProperty('msg')) {
            alert(res.msg);
        }
        callback(res)
    }
}