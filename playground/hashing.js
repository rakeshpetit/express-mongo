const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

// const message = 'Superman Batman'
// const hash = SHA256(message).toString()

// console.log('message', message)
// console.log('hash', hash)

const data = {
    id: 1
}

const token = jwt.sign(data, '123abc4')
console.log(token)

const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY3OTUzMzk3fQ.wlICALQCd3z-k7FEW9vsX07GOTORqcXPlI3xiPgXoao'

const decode = jwt.verify(tokenStr, '123abc4')
console.log(decode)