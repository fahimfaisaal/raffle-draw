const User = require("../models/User")
const Ticket = require("../models/Ticket")

console.log("I am from DB: ", User, Ticket)

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
     * @return {DB}
     */
    setUser(user) {
        if (user instanceof User) {
            this.users[user.id] = user
        }

      return this
    }

    /**
     * @method draw
     * @description - this method return a set of winners based on the ticketList length
     * @param {number} winners 
     * @returns {Array<Ticket>} - list of winners
     */
    draw(winners) {
        const winnersSet = new Set()
        let index;

        while (winners--) {
            index = Math.trunc(Math.random() * this.ticketList.length)

            winnersSet.has(index)
                ? winners++
                : winnersSet.add(index)
        }

        return [...winnersSet].map(winnerIndex => this.ticketList[winnerIndex])
    }
}

module.exports = new DB(); 