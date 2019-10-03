import client from '../../config/influxdb'
import repository from '../../models/studyTime'

export default async (id, body) => {
  const { courseId, courseName } = body
  const { measurement, fieldSchema, tagSchema } = repository

  client.schema(measurement, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  try {
    const conditions = { _id: id }

    const updateFields = {
      courseId: courseId,
      courseName: courseName,
    }

    await client.findOneAndUpdate(measurement, conditions, updateFields)

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
