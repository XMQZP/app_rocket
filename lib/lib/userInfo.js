module.exports = class userInfo {
    constructor(data = null) {
        this.userid = null;
        this.gid = null;
        this.mobile = null;
        this.account = null;
        this.nickname = null;
        this.amount = null;
        this.commission = null;
        this.token = null;
        this.wechat = null;
        this.qq = null;
        this.email = null;
        this.avatar = null;
        this.gender = null;
        this.birth = null;
        this.address = null;
        this.register_ip = null;
        this.register_time = null;
        this.login_ip = null;
        this.login_time = null;
        this.status = null;
    }

    //数据
    setData(data) {
        if(data == null) {
            console.warn('#28 清空用户数据');
            data = {};
        }
        data["_user_id"] && (this.userid = data["_user_id"]);
        data["_gid"] && (this.gid = data["_gid"]);
        data["_mobile"] && (this.mobile = data["_mobile"]);
        data["_account"] && (this.account = data["_account"]);
        data["_nickname"] && (this.nickname = data["_nickname"]);
        data["_amount"] && (this.amount = data["_amount"]);
        data["_commission"] && (this.commission = data["_commission"]);
        data["_token"] && (this.token = data["_token"]);
        data["_wechat"] && (this.wechat = data["_wechat"]);
        data["_qq"] && (this.qq = data["_qq"]);
        data["_email"] && (this.email = data["_email"]);
        data["_avatar"] && (this.avatar = data["_avatar"]);
        data["_gender"] && (this.gender = data["_gender"]);
        data["_birth"] && (this.birth = data["_birth"]);
        data["_address"] && (this.address = data["_address"]);
        data["_register_ip"] && (this.register_ip = data["_register_ip"]);
        data["_register_time"] && (this.register_time = data["_register_time"]);
        data["_login_ip"] && (this.login_ip = data["_login_ip"]);
        data["_login_time"] && (this.login_time = data["_login_time"]);
        data["_status"] && (this.status = data["_status"]);
    }

    //
    getData(is_modify = true) {
        if (is_modify)
            return this;
        else
            return Object.assign({}, this);
    }
}

