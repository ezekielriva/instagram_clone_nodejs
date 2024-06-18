import User from "./user";

export default class NullUser extends User {
    constructor() {
        super("noop","noop","noop","noop");
    }
}