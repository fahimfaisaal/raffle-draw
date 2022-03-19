const shortid = require('shortid')
const DB = require('../db/DB')
const Ticket = require('./Ticket')

console.log("I am from User", DB, Ticket)

class User {
    #proxyHandler = {
        set: (target, key, currentValue) => {
            switch (key) {
                case 'name': this.#updateTickets(target, currentValue)
                    break
                case 'id': {
                    return false
                }
                case 'tickets':
                    return false
                default:
                    return true
            }

            target[key] = currentValue
            return true
        } 
    }
    
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.tickets = []
        
        const user = new Proxy(Object.seal(this), this.#proxyHandler)

        DB.setUser(user);

        return user
    }

    #updateTickets(target, currentName) {
        if (target.name !== currentName) {
            target.tickets = target.tickets.map(ticket => {
                ticket.username = currentName
                ticket.editedAt = new Date().toISOString()
                return ticket
            })
        }
    }

    buyTicket(price, quantity = 1) {
        while (quantity--) {
            const ticket = new Ticket(this.name, price)
            this.tickets.push(ticket)

            DB.setTicket(ticket)
        }
    }
}

module.exports = User