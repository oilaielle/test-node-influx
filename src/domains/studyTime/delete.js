// import Influx from 'influxdb-nodejs'
import client from '../../config/influxdb'
import repository from '../../models/studyTime'

export default async id => {
  const { measurement } = repository
  try {
    await client.queryRaw(`DELETE FROM "${measurement}" WHERE "_id" = '${id}'`)
    await client.query(measurement).queue()
    const resp = await client.syncQuery('json')
    return resp
  } catch (error) {
    console.log('error\n', error)
  }
}
