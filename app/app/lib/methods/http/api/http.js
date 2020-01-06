let axios = require('axios');

exports = exports || {};

exports.get = async function (url, head = {}) {
    head = head || {};
    return axios.get(url, {
        headers: head,
    })
}

exports.post = async function (url, data, head = {}) {
    head = head || {};
    return axios.post(url, data, {
        headers: head,
    })
}

/**
 *
 * @param type 提交类型
 * @param url 地址
 * @param data 数据
 * @param head 额头
 * @returns {Promise<void>}
 */
exports.send = async function (type, url, data, head = {}) {
    switch (type) {
        case 'get':
        case 'GET':
        case 'Get': {
            //GET 合并到url
            data = data || {};
            let keys = Object.keys(data);
            for(let ki = 0; ki < keys.length; ki++){
                let data_key = keys[ki];
                if(ki == 0){
                    url += `?${data_key}=${data[data_key]}`;
                }else{
                    url += `&${data_key}=${data[data_key]}`;
                }
            }
            return exports.get(url, head);
        }
        case 'post':
        case 'POST':
        case 'Post': {
            return exports.post(url, data, head);
        }
        default:{
            throw new Error('未知的提交类型');
        }
    }
}
