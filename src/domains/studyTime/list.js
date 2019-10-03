import client from '../../config/influxdb'
import repository from '../../models/studyTime'

export default async () => {
  const { measurement } = repository
  try {
    await client.query(measurement).queue()
    const resp = await client.syncQuery('json')
    return resp
  } catch (error) {
    console.log('error\n', error)
  }
}
