/**
 * This function create an custom error by passing message and status code
 * @param {string} message 
 * @param {number} status 
 */
module.exports = (message = 'Something went Wrong', status = 500) => {
  const error = new Error(message)
  error.status = status

  return error
}