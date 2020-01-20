const { ServiceBusClient } = require('@azure/service-bus')

// Define connection string and related Service Bus entity names here
const connectionString = 'Endpoint=sb://sndfm2infsb1001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=ght2ixCfykVOr/z/HY1ERSo5IO3r/vSmHAHvJjrZ/VM='
const queueName = 'fews-eventcode-queue'

async function main () {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString)
  const queueClient = sbClient.createQueueClient(queueName)
  const sender = queueClient.createSender()

  try {
    for (let i = 0; i < 10; i++) {
      const message = {
        body: `Hello world! ${i}`,
        label: `test`,
        userProperties: {
          myCustomPropertyName: `my custom property value ${i}`
        }
      }
      console.log(`Sending message: ${message.body}`)
      await sender.send(message)
    }

    await queueClient.close()
  } finally {
    await sbClient.close()
  }
}

main().catch((err) => {
  console.log('Error occurred: ', err)
})
