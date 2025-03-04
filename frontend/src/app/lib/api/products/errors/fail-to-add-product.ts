export class FailToAddProduct extends Error {
    constructor(message: string, cause: Error){
        super(message, {cause})
        this.name = "FailToAddProduct"
        this.cause = cause
    }
}   
