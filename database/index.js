const User = require("../models/User")
const Ticket = require("../models/Ticket")
const { readData, writeData } = require('../utils/readWriteData')

class DB {
    #winners
    #users
    
    constructor() {
        (async () => {
            this.#winners = []
            this.#users = await readData()
        })()

        return Object.seal(this)
    }

    /**
     * @param {string} userId 
     * @returns {User}
     */
    getUser(userId) {
        return this.#users[userId] ?? null
    }

    /**
     * @param {string} name 
     * @returns {User}
     */
    setUser(name) {
        if (!name) {
            throw new Error('Invalid username')
        }

        const user = new User(name)
        this.#users[user.id] = user
        
        writeData(this.#users)
        return user
    }

    /**
     * @param {string} userId 
     * @param {string} ticketId 
     * @returns {Ticket|null} - deleted Ticket if exist else null
     */
    deleteTicket(userId, ticketId) {
        const user = this.#users[userId]
        const ticketIndex = user.tickets.findIndex((ticket) => ticket.id === ticketId)

        if (~ticketIndex) {
            return user.tickets.splice(ticketIndex, 1)[0]
        }

        writeData(this.#users)
        return null
    }

    /**
     * @param {string} userId
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */
    buyTicket(userId, price, quantity = 1) {
        const user = this.#users[userId]

        while (quantity--) {
            const ticket = new Ticket(user.name, userId, price)
            
            user.tickets.push(ticket)
        }

        writeData(this.#users)
        return user.tickets
    }

    /**
     * @method draw
     * @description - this method return an unique Ticket array of winners based on the ticketList length
     * @param {number} numberOfWinners - the number of winners
     * @returns {Array<Ticket>} - list of winners ticket
     */
    draw(numberOfWinners) {
        const ticketList = Object
            .values(this.#users)
            .reduce((list, user) => list.concat(user.tickets), [])

        const winnerIdSet = new Set()
        let winnerIndex = -1;

        while (ticketList.length && numberOfWinners--) {
            winnerIndex = Math.trunc(Math.random() * ticketList.length)
            const winnersTicket = ticketList[winnerIndex]

            if (winnerIdSet.has(winnersTicket.userId)) {
                winners++
                continue
            }

            winnerIdSet.add(winnersTicket.userId)
            this.winners.push(winnersTicket)
        }

        return this.#winners
    }
}

module.exports = new DB(); 