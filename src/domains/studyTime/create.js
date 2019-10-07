import uuidV4 from 'uuid/v4'
import moment from 'moment'
import client from '../../config/influxdb'
import repository from '../../models/studyTime'

export default async body => {
  const {
    secondWatch,
    courseId,
    courseName,
    courseItemId,
    device,
    gender,
    birthday,
    userEmail,
    accessTime,
  } = body

  const { measurement, fieldSchema, tagSchema } = repository
  const id = uuidV4(measurement)

  const major = client
  major.schema(measurement, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  const measurementMinor = `${measurement}_${moment().format('YYYY_MM')}`
  // console.log('measurementMinor', measurementMinor);

  const minor = client
  client.schema(measurementMinor, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  const dataTag = {
    _id: id,
    courseId: courseId,
    courseName: courseName,
    courseItemId: courseItemId,
    device: device,
    gender: gender,
    birthday: birthday,
    userEmail: userEmail,
    accessTime: accessTime,
  }

  const dataField = {
    secondWatch: secondWatch,
  }

  try {
    await major
      .write(measurement)
      .tag(dataTag)
      .field(dataField)

    await minor
      .write(measurementMinor)
      .tag(dataTag)
      .field(dataField)

    await major
      .query(measurement)
      .condition('_id', id)
      .queue()
    const resp = await major.syncQuery('json')
    return resp
  } catch (error) {
    console.log('error\n', error)
  }
}
