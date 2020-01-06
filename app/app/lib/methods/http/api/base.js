class http_chain {
    constructor() {
        this.submit = null;
        this.route = null;
        this.request = null;
    }

    //private:
    setRoute(route) {
        this.route = route;
    }

    setSubmitType(submit) {
        this.submit = submit;
    }

    /**
     * @param {Object} request 可空
     */
    setRequest(request) {
        this.request = request;
    }

    getSubmitRouteRequest() {
        return {submit: this.submit, route: this.route, request: this.request};
    }

    //protect:
    onResponse() {
        console.log(this.route, '有返回');
    }
}

module.exports = http_chain;
