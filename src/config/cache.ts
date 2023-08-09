import { createClient } from 'redis'

const client = createClient()

;(async () => {
  await client.connect()
})()

client.on('ready', async function () {
  client.on('error', function () {
    //still more logging to doc
    console.log('Error connecting to cache')
  })
  console.log('Cache is connected and ready')
})

export default client
