class User {
    /**
     * @param {string} name 
     * @returns {User} - sealed
     */
    constructor(name) {
        this.name = name
        this.id = Math.random().toString(32).substring(2)
        this.tickets = []

        return Object.seal(this)
    }

    get ticketInfo() {
        const info = {
            numberOfTickets: {},
            totalCost: 0
        }

        return Object.freeze(
            this.tickets.reduce(({ numberOfTickets, totalCost }, { price }) => ({
                    numberOfTickets: numberOfTickets[price] + 1 || 1,
                    totalCost: totalCost + price
                }), info)
        )
    }

    set setName(newName) {
        if (this.name !== newName) {
            this.name = newName

            this.tickets = this.tickets.map(ticket => {
                ticket.username = newName
                ticket.editedAt = new Date().toISOString()
            })

            return true
        }

        return false
    }
}

module.exports = User