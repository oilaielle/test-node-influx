import client from '../../config/influxdb'
import repository from '../../models/example'

export default async (id, body) => {
  // console.log('555555\n')
  // console.log('id\n', id)
  // console.log('body\n', body)

  const { courseId, courseName, courseItemId, userEmail, accessTime } = body
  const { measurement, fieldSchema, tagSchema } = repository

  client.schema(measurement, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  try {
    const conditions = { _id: id }

    const updateFields = {
      userEmail: userEmail,
      courseId: courseId,
      courseName: courseName,
      courseItemId: courseItemId,
      accessTime: accessTime,
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
