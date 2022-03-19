const User = require("../models/User")
const Ticket = require("../models/Ticket")

class DB {
    constructor() {
        this.winners = []
        this.ticketList = []
        this.users = {}

        return Object.freeze(this)
    }

    addUser(name) {
        const user = new User(name)
        this.users[user.id] = user
        
        return user
    }

    deleteTicket(userId, ticketId) {
        const ticketIndex = this.ticketList.findIndex(ticket => ticket.id === ticketId)
        this.ticketList.splice(ticketIndex, 1)

        this.users[userId].tickets.delete(ticketId)
    }

    /**
     * @param {User} user 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */
    buyTicket(userId, price, quantity = 1) {
        const user = this.users[userId]

        while (quantity--) {
            const ticket = new Ticket(user.name, price)

            this.ticketList.push(ticket)
            user.tickets.set(ticket.id, ticket)
        }
    }

    /**
     * @method draw
     * @description - this method return a set of winners based on the ticketList length
     * @param {number} winners 
     * @returns {Array<Ticket>} - list of winners
     */
    draw(winners) {
        const indexSet = new Set()
        let winnerIndex;

        while (winners--) {
            winnerIndex = Math.trunc(Math.random() * this.ticketList.length)

            if (indexSet.has(winnerIndex)) {
                winners++
                continue
            }

            indexSet.add(winnerIndex)
            this.winners.push(this.ticketList[winnerIndex])
        }

        return this.winners
    }
}

module.exports = new DB(); 