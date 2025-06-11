class ExpressError extends Error{
    constructor(status=401,message="Something wrong"){
        super();
        this.status=status;
        this.message=message;
    }
}

module.exports=ExpressError;