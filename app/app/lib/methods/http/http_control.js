const http = require('./http');
const port = 3887;
const url = 'http://192.168.1.102';
const http_url = `${url}:${port}`;

//
let in_userid = null;
let in_token = null;

//
//
exports.doHttpRequest = async function (api_path, data) {
    //
    return http.send('post', `${http_url}/api`, data, {
        userid: in_userid,
        token: in_token,
        "api-path": api_path,
    });
}

exports.setUserToken = function (userid, token) {
    in_userid = userid;
    in_token = token;
};
