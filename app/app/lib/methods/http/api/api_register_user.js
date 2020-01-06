const base = require('./base');
//
module.exports = class extends base {
    constructor() {
        super();
        //
        this.setRoute('/register_user');
        this.setSubmitType('post');
        //
        this.account = null;
        this.password = null;
        this.email = null;
        this.name = null;
    }

    setRequest(request) {
        try {
            this.account = request.account;
            this.password = request.password;
            this.email = request.email;
            this.name = request.name;
            //
            super.setRequest(request);
        } catch (e) {
            throw new Error(`请检查参数${request}`);
        }
    }

    onResponse() {
        super.onResponse();
        //

    }
}
