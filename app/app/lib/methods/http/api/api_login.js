const base = require('./base');
//
module.exports = class extends base {
    constructor() {
        super();
        this.setRoute('/login');
        this.setSubmitType('post');
        //
        this.account = null;
        this.password = null;
    }

    setRequest(request) {
        try {
            this.account = request.account;
            this.password = request.password;
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
