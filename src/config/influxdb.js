import index from './index'
import Influx from 'influxdb-nodejs'

const { host, port, name } = index.database
const client = new Influx(`${host}:${port}/${name}`)

export default client
