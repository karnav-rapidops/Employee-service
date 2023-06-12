const makeProducer = require('./producer')
const {Kafka} = require('kafkajs');

const producer = makeProducer({
    Kafka,
})

module.exports = Object.freeze({
    producer,
})