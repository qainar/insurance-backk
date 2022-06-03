export class UserDto{
    email;
    id;
    number;
    name;
    isActivated;

    constructor(model) {
        this.email = model.email
        this.name = model.name
        this.id = model._id
        this.number = model.number
        this.isActivated = model.isActivated
    }
}