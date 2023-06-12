const { Kafka } = require('kafkajs')
const email = require('../use-cases/email');

runConsumer();

async function runConsumer()
{   
    const kafka = new Kafka({
        clientId: 'microservices',
        brokers: ['localhost:9092']
      })

    const consumer = kafka.consumer({ groupId: 'group1' });
    await consumer.connect();
    await consumer.subscribe({
        topic: 'employee-registred'   
    })

    consumer.run({
        eachMessage: async ({ topic, partition, message })=>{
            console.log({
                    topic,
                    partition,
                    offset: message.offset, 
                });
            console.log("Object from producer: ", JSON.parse(message.value))
            
            const data = JSON.parse(message.value)

            await email.sendEmail({ empname: data.empname , toEmail: 'krnvgmt@gmail.com', verificationToken: data.verificationToken });
    }
})
}