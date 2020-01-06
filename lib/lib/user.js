//CONST Rrequire
const httpControl = require('./http/http_control');
//LET Require
let userInfo = require('./userInfo');
//内部
async function aPromise(executor){
    return new Promise(executor);
}
//
class user {
    //服务器传送下至用户数据
    constructor(data = null) {
        //
        this.userInfo = new userInfo();
        //
        data && this.setUserInfo(data);
        user.self = this;
    }

    //数据
    setUserInfo(data) {
        this.userInfo.setData(data);
    }

    //获取数据
    async getUserInfo(refresh = false) {
        return aPromise((resolve) => {
            let userInfo = this.userInfo.getData();
            if (refresh) {
                //TODO: 从服务器重新请求
            } else {
                resolve(userInfo);
            }
        });
    }

    async register (account, password, email, name) {
        try {
            let res = await httpControl.doHttpRequest('api.user.register_user', {account, password, email, name});
            return await aPromise((resolve) => {
                //
                let result = res.data;
                if (!result.code) {
                    //
                    resolve({err: null, ret: '注册成功'});
                } else {
                    resolve({err: null, ret: `注册失败:${result.data}`});
                }
            });
        } catch (e) {
            console.warn('e 注册失败', e);
            return await aPromise((resolve) => {
                resolve({err: 1, ret: '注册失败'});
            });
        }
    }

    //登录
    async login(account, password) {
        try {
            let res = await httpControl.doHttpRequest('api.user.login', {account, password});
            return await aPromise((resolve) => {
                //
                let result = res.data;
                if (!result.code) {
                    //登录成功
                    this.userInfo.setData(result.data);
                    httpControl.setUserToken(result.data._user_id, result.data._token);
                    //
                    resolve({err: null, ret: '登录成功'});
                } else {
                    resolve({err: null, ret: `登录失败:${result.data}`});
                }
            });
        } catch (e) {
            console.warn('e 登录失败', e);
            return await aPromise((resolve) => {
                resolve({err: 1, ret: '登录失败'});
            });
        }
    }
}

//自己
user.self = null

//
module.exports = user;
