const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// const message = 'Superman Batman'
// const hash = SHA256(message).toString()

// console.log('message', message)
// console.log('hash', hash)

// const data = {
//     id: 1
// }

// const token = jwt.sign(data, '123abc4')
// console.log(token)

// const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY3OTUzMzk3fQ.wlICALQCd3z-k7FEW9vsX07GOTORqcXPlI3xiPgXoao'

// const decode = jwt.verify(tokenStr, '123abc4')
// console.log(decode)

const password = 'rakabc123$'
const wrongPass = 'rakabc123.'

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash)
//     })
// })

const hash = '$2a$10$HfBBEvZaBqGc9pXvdI8J8.5Ewdq7LoxZ7xPQyLRwZuqwKtnoDXeUO'

bcrypt.compare(password, hash, (err, res) => {
    console.log(res)
})