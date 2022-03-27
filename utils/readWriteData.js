const fs = require('fs/promises')

/**
 * @function readData
 * @description - This function read the data.json file & return the object of user json
 * @returns {Object} - user object
 */
const readData = async () => {
  const data = await fs.readFile(`${__dirname}/../data/data.json`)
  return JSON.parse(data)
}

/**
 * @function writeData
 * @description - This function receive an object & it's save asynchronously to data.json by parsing string
 * @param {Object} data 
 * @returns {JSON} - user json
 */
const writeData = (data) => {
  const jsonData = JSON.stringify(data)
  fs.writeFile(`${__dirname}/../data/data.json`, jsonData)

  return jsonData
}

module.exports = {
  readData,
  writeData
}