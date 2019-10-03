import uuidV4 from 'uuid/v4'
import client from '../../config/influxdb'
import repository from '../../models/studyTime'

export default async body => {
  const { courseId, courseName } = body
  const { measurement, fieldSchema, tagSchema } = repository
  const id = uuidV4(measurement)

  client.schema(measurement, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  try {
    await client
      .write(measurement)
      .tag({
        _id: id,
      })
      .field({
        courseId: courseId,
        courseName: courseName,
      })

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
