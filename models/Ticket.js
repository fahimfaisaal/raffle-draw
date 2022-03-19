const shortid = require('shortid')
console.log("I am from Ticket")

class Ticket {
    /**
     * @param {User} user 
     */
    constructor(name, price) {
        this.username = name;
        this.price = price
        this.id = shortid.generate();
        this.createAt = new Date().toISOString()
        this.editedAt = new Date().toISOString()

        return Object.seal(this)
    }
}

module.exports = Ticket