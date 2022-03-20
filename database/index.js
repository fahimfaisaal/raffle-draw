const User = require("../models/User")
const Ticket = require("../models/Ticket")

class DB {
    constructor() {
        this.winners = []
        this.users = {}

        return Object.freeze(this)
    }

    /**
     * @param {string} name 
     * @returns {User}
     */
    setUser(name) {
        const user = new User(name)
        this.users[user.id] = user
        
        return user
    }

    /**
     * @param {string} userId 
     * @param {string} ticketId 
     * @returns {Ticket|null} - deleted Ticket if exist or null
     */
    deleteTicket(userId, ticketId) {
        const user = this.users[userId]
        const ticketIndex = user.tickets.findIndex((ticket) => ticket.id === ticketId)

        if (~ticketIndex) {
            return user.tickets.splice(ticketIndex, 1)[0]
        }

        return null
    }

    /**
     * @param {string} userId
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */
    buyTicket(userId, price, quantity = 1) {
        const user = this.users[userId]

        while (quantity--) {
            const ticket = new Ticket(user.name, userId, price)
            
            user.tickets.push(ticket)
        }

        return user.tickets
    }

    /**
     * @method draw
     * @description - this method return a set of winners based on the ticketList length
     * @param {number} winners - the number of winners
     * @returns {Array<Ticket>} - list of winners ticket
     */
    draw(winners) {
        const ticketList = Object
            .values(this.users)
            .reduce((list, user) => [...list, ...user.tickets], [])

        const winnerIdSet = new Set()
        let winnerIndex = null;

        while (ticketList.length && winners--) {
            winnerIndex = Math.trunc(Math.random() * ticketList.length)
            const winnersTicket = ticketList[winnerIndex]

            if (winnerIdSet.has(winnersTicket.userId)) {
                winners++
                continue
            }

            winnerIdSet.add(winnersTicket.userId)
            this.winners.push(winnersTicket)
        }

        return this.winners
    }

}

module.exports = new DB(); 