const shortid = require('shortid')

class Ticket {
    /**
     * @param {string} name
     * @param {string} userId
     * @param {number} price
     * @returns {Ticket} - sealed
     */
    constructor(name, userId, price) {
        this.username = name;
        this.price = price
        this.id = shortid.generate();
        this.userId = userId
        this.createAt = new Date().toISOString()
        this.editedAt = new Date().toISOString()

        return Object.seal(this)
    }
}

module.exports = Ticket