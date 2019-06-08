const redis = require('redis')
const {REDIS_CONF} = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.host)

redisClient.on('error', err => {
    console.error('redis发生故障:', err)
})

// function set(key, val) {
//     redisClient.set(key, val, redis.print)
// }
//
// function get(key) {
//     const promise = new Promise((resole, reject) => {
//         redisClient.get(key, (err, val) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             resole(val)
//         })
//     })
//     return promise
// }

module.exports = redisClient