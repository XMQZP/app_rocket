const base = require('./base');
//
module.exports = class extends base{
    constructor(){
        super();
        //
        this.setRoute('/home');
        this.setSubmitType('get');
    }

    onResponse() {
        super.onResponse();
        //

    }
}
