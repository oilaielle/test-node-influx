import uuidV4 from 'uuid/v4'
import client from '../../config/influxdb'
import repository from '../../models/example'

export default async () => {
  const { measurement, fieldSchema, tagSchema } = repository

  client.schema(measurement, fieldSchema, tagSchema, {
    // default is false
    stripUnknown: true,
  })

  // 1 ดูเวลาทั้งหมดที่ user เริ่มดูจน จบ course ได้ว่าดูไปกี่วัน (x,y)
  // 2 ดูว่า course นั้นเรียนไปกี่นาที
  // 3 ดูว่า คนที่เรียน course มีกี่คน
  // 4 ดู sum เวลาที่ดูแต่ละ course
  // 5 ดู sum เวลาที่ดูแต่ละ คน

  try {
    for (let index1 = 1; index1 <= 1000; index1++) {
      const random100 = Math.floor(Math.random() * 100)
      // const random9 = Math.floor(Math.random() * 9)
      await client
        .write(measurement)
        .tag({
          _id: uuidV4(measurement),
          courseId: `courseId${random100}`,
          courseName: `courseName${random100}`,
          courseItemId: `courseItemId${random100}`,
          device: 'mobile',
          // device: 'tablet',
          // device: 'computer',
          gender: 'female',
          // gender: 'male',
          birthday: `199${Math.floor(Math.random() * 9)}-0${Math.floor(Math.random() * 9)}-1${Math.floor(Math.random() * 9)}`,
          userEmail: `userEmail_female${Math.floor(Math.random() * 100)}@skilllane.com`,
          // userEmail: `userEmail_male${Math.floor(Math.random() * 100)}@skilllane.com`,
          accessTime: `2019-0${Math.floor(Math.random() * 9)}-0${Math.floor(Math.random() * 9)}T0${Math.floor(Math.random() * 9)}:${Math.floor(Math.random() * 9)}9:45.704009Z`,
        })
        .field({
          secondWatch: Math.floor(Math.random() * 60),
        })
    }

    return 'OK'
  } catch (error) {
    console.log('error\n', error)
  }
}
