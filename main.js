const User = require('./models/User')
const DB = require('./db/DB')
console.log("I am from Main: ", DB, User)

const user = new User('Fahim Faisal')
// user.buyTicket('100')

console.log(DB)
