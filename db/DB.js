const User = require("../models/User")
const Ticket = require("../models/Ticket")

console.log("I am from DB", User, Ticket)

class DB {
    constructor() {
        this.ticketList = []
        this.users = {}

        return Object.freeze(this)
    }

    /**
     * @method setTicket
     * @description - this method push the specific ticket to the ticketList
     * @param {Ticket} ticket 
     * @returns {Ticket}
     */
    setTicket(ticket) {
        if (ticket instanceof Ticket) {
            this.ticketList.push(ticket)
        }

        return ticket
    }

    /**
     * @method setUser
     * @description - this method add the specific user to the user object by id
     * @param {User} user
     * @return {User}
     */
    setUser(user) {
        if (user instanceof User) {
            this.users[user.id] = user
        }

      return user
    }
}

module.exports = new DB(); 