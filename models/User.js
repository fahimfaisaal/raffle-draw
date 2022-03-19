const shortid = require('shortid')
class User {    
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.tickets = new Map()

        return Object.seal(this)
    }

    get ticketInfo() {
        const info = {
            numberOfTickets: {},
            totalCost: 0
        }

        for (const ticket of this.tickets.values()) {
            const { price } = ticket;

            info.numberOfTickets[price] = info.numberOfTickets[price] + 1 || 1
            info.totalCost += price
        }

        return Object.freeze(info)
    }

    set setName(newName) {
        if (this.name !== newName) {
            this.name = newName

            this.tickets.map(ticket => {
                ticket.username = newName
                ticket.editedAt = new Date().toISOString()
            })

            return true
        }

        return false
    }
}

module.exports = User