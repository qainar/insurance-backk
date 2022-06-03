export class PropertyDto{
    id;
    type;
    period;
    price;
    user;
    constructor(model) {
        this.id = model._id
        this.type = model.type
        this.period = model.period
        this.price = model.price
        this.user = model.user
    }
}