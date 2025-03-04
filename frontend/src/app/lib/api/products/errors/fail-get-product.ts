export class FailToGetProduct extends Error {
    constructor(message: string, cause: Error){
        super(message, {cause})
        this.name = "FailToGetProduct"
        this.cause = cause
    }
}