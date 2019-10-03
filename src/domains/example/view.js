import client from '../../config/influxdb'
import repository from '../../models/example'

export default async id => {
  const { measurement } = repository
  try {
    await client
      .query(measurement)
      .condition('_id', id)
      .queue()
    const resp = await client.syncQuery('json')
    return resp
  } catch (error) {
    console.log('error\n', error)
  }
}
